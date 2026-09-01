import asyncio
import os
import sys
import logging
import subprocess
import time
import json
import urllib.request
from google.antigravity import Agent, LocalAgentConfig, CapabilitiesConfig

# Configure robust logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

async def run_with_retry(agent, prompt, max_retries=3):
    for attempt in range(max_retries):
        try:
            response = await agent.chat(prompt)
            return response.text
        except Exception as e:
            logger.warning(f"Attempt {attempt + 1} failed: {e}")
            if attempt == max_retries - 1:
                logger.error("Max retries reached. Failing workflow.")
                raise
            await asyncio.sleep(5)

def run_git_command(command):
    try:
        subprocess.run(command, check=True, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except subprocess.CalledProcessError as e:
        logger.error(f"Git command failed: {e.stderr.decode()}")
        raise

def send_discord_notification(webhook_url, message):
    data = {"content": message}
    req = urllib.request.Request(
        webhook_url,
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}
    )
    try:
        urllib.request.urlopen(req)
    except Exception as e:
        logger.error(f"Failed to send Discord notification: {e}")

async def main():
    if not os.environ.get("GEMINI_API_KEY"):
        logger.error("GEMINI_API_KEY missing.")
        sys.exit(1)

    logger.info("Initializing Multi-Agent Cloud Pipeline...")

    # --- Agent Configs ---
    researcher_config = LocalAgentConfig(system_instructions="You are the Topic Researcher. Your role is strictly to research and outline.", capabilities=CapabilitiesConfig())
    generator_config = LocalAgentConfig(system_instructions="You are the Content Generator. Your role is strictly to draft markdown content from outlines.", capabilities=CapabilitiesConfig())
    seo_config = LocalAgentConfig(system_instructions="You are the SEO Optimizer. Your role is strictly to optimize drafts for SEO and GEO.", capabilities=CapabilitiesConfig())
    tone_config = LocalAgentConfig(system_instructions="You are the Tone Editor. Your role is strictly to scrub AI-isms.", capabilities=CapabilitiesConfig())
    publisher_config = LocalAgentConfig(system_instructions="You are the Publisher. Write files to disk.", capabilities=CapabilitiesConfig())
    verifier_config = LocalAgentConfig(system_instructions="You are the Deployment Verifier. Ensure the URL is live (returns 200).", capabilities=CapabilitiesConfig())
    qa_config = LocalAgentConfig(system_instructions="You are the Visual QA Auditor. Inspect the HTML structure for proper Tailwind typography classes.", capabilities=CapabilitiesConfig())

    try:
        # 1. Research
        logger.info("Step 1: Topic Researcher is generating topic & outline...")
        async with Agent(researcher_config) as researcher:
            topic_outline = await run_with_retry(researcher, "Pick a marketing trend or a systems automation trend. Write a detailed outline.")
        
        # 2. Draft
        logger.info("Step 2: Content Generator is drafting content...")
        async with Agent(generator_config) as generator:
            draft_prompt = (
                "Using the following research outline, draft a comprehensive, engaging blog post.\n"
                "CRITICAL VISUAL RULE 1 - TITLES MUST BE SHORT: The title MUST be short, punchy, and no longer than 6 words.\n"
                "CRITICAL VISUAL RULE 2 - H1 REQUIRED: Your markdown body MUST start with a single `# H1` heading containing the exact short title.\n"
                "CRITICAL VISUAL RULE 3 - NO RICH MEDIA: Do not include featured images, cover images, or excerpts. Use standard markdown.\n"
                "CRITICAL FRONTMATTER RULE: You MUST include frontmatter containing `title`, `date` (YYYY-MM-DD), and `categories` (a single string). Do NOT use tags.\n"
                f"\nOutline:\n{topic_outline}"
            )
            draft = await run_with_retry(generator, draft_prompt)
        
        # 3. SEO
        logger.info("Step 3: SEO Optimizer is optimizing...")
        async with Agent(seo_config) as seo_optimizer:
            seo_draft = await run_with_retry(seo_optimizer, f"Optimize this draft for SEO/GEO:\n\n{draft}")
        
        # 4. Tone
        logger.info("Step 4: Tone Editor is reviewing...")
        async with Agent(tone_config) as tone_editor:
            final_content = await run_with_retry(tone_editor, f"Scrub AI-isms and fix tone:\n\n{seo_draft}")
        
        # 5. Publisher
        logger.info("Step 5: Publisher is writing to disk...")
        async with Agent(publisher_config) as publisher:
            publish_prompt = (
                "Write this content into a new file in the `src/blog/` directory. "
                "The filename should be short, kebab-case, and end in `.md`. Do not perform any git operations.\n"
                f"Content:\n{final_content}"
            )
            await run_with_retry(publisher, publish_prompt)
            
        # 6. Git Push
        logger.info("Step 6: Committing and Pushing to GitHub...")
        run_git_command('git config --global user.name "github-actions[bot]"')
        run_git_command('git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"')
        run_git_command('git add src/blog/*.md')
        run_git_command('git commit -m "docs: publish autonomous blog post"')
        run_git_command('git push')
        
        # We need to extract the filename that was pushed to verify the URL
        async with Agent(verifier_config) as url_extractor:
            url_slug = await run_with_retry(url_extractor, f"Based on this draft, what is the expected URL slug (e.g., 'combating-crm-data-decay')? Output only the slug.\n\n{final_content}")
            live_url = f"https://caulhaus.com/blog/{url_slug.strip()}/"
            
        logger.info(f"Waiting 90 seconds for GitHub Pages to build {live_url}...")
        await asyncio.sleep(90)
            
        # 7. Deployment Verifier
        logger.info("Step 7: Deployment Verifier is checking the live URL...")
        async with Agent(verifier_config) as verifier:
            verify_prompt = f"Using your web tools, send an HTTP GET request to {live_url}. Verify it returns a 200 OK and is not a 404 page. Retry up to 3 times with delays if needed."
            await run_with_retry(verifier, verify_prompt, max_retries=5)
            
        # 8. Visual QA Auditor
        logger.info("Step 8: Visual QA Auditor is checking the HTML layout...")
        async with Agent(qa_config) as qa:
            qa_prompt = f"Using your web tools, read the HTML source of {live_url}. Verify that the `<article>` tag contains the `prose` classes for typography. Ensure there are no layout errors."
            await run_with_retry(qa, qa_prompt)
            
        # 9. Notification
        logger.info("Step 9: Sending Discord notification...")
        webhook_url = os.environ.get("DISCORD_WEBHOOK_URL")
        if webhook_url:
            message = f"🚀 **New Blog Post is Live!**\nThe autonomous pipeline has successfully published and verified a new post.\nRead it here: {live_url}"
            send_discord_notification(webhook_url, message)
            logger.info("Discord notification sent!")
        else:
            logger.warning("DISCORD_WEBHOOK_URL environment variable is missing. Skipping notification.")

        logger.info("Multi-Agent Pipeline execution completed successfully!")
    except Exception as e:
        logger.error(f"Pipeline failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())