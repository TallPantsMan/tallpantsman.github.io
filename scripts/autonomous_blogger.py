import asyncio
import os
import sys
import logging
from google.antigravity import Agent, LocalAgentConfig, CapabilitiesConfig

# Configure robust logging for the cloud execution environment
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

async def run_with_retry(agent, prompt, max_retries=3):
    """Executes a prompt against the agent with robust retry logic for API timeouts."""
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

async def main():
    if not os.environ.get("GEMINI_API_KEY"):
        logger.error("GEMINI_API_KEY environment variable is missing. Cannot start agents.")
        sys.exit(1)

    logger.info("Initializing Multi-Agent Cloud Pipeline...")

    # --- 1. Topic Researcher Agent ---
    researcher_config = LocalAgentConfig(
        system_instructions="You are the Topic Researcher for Caulhaus Consulting Group. Your role is strictly to research and outline.",
        capabilities=CapabilitiesConfig()
    )
    
    # --- 2. Content Generator Agent ---
    generator_config = LocalAgentConfig(
        system_instructions="You are the Content Generator for Caulhaus Consulting Group. Your role is strictly to draft markdown content from outlines.",
        capabilities=CapabilitiesConfig()
    )
    
    # --- 3. SEO Optimizer Agent ---
    seo_config = LocalAgentConfig(
        system_instructions="You are the SEO Optimizer for Caulhaus Consulting Group. Your role is strictly to optimize drafts for SEO and GEO.",
        capabilities=CapabilitiesConfig()
    )
    
    # --- 4. Tone Editor Agent ---
    tone_config = LocalAgentConfig(
        system_instructions="You are the Tone Editor for Caulhaus Consulting Group. Your role is strictly to scrub AI-isms and enforce a human, professional tone.",
        capabilities=CapabilitiesConfig()
    )
    
    # --- 5. Publisher Agent ---
    publisher_config = LocalAgentConfig(
        system_instructions="You are the Publisher for Caulhaus Consulting Group. Your role is strictly to write files to disk.",
        capabilities=CapabilitiesConfig()
    )

    try:
        # 1. Research Phase
        logger.info("Step 1: Topic Researcher is generating topic & outline...")
        async with Agent(researcher_config) as researcher:
            topic_prompt = (
                "Pick a marketing trend or a systems automation trend (like setting up Google Workspace automations via AppScript). "
                "It must align with our core competencies. Write a detailed outline for a blog post."
            )
            topic_outline = await run_with_retry(researcher, topic_prompt)
        
        # 2. Drafting Phase
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
        
        # 3. SEO Phase
        logger.info("Step 3: SEO Optimizer is optimizing for SEO/GEO...")
        async with Agent(seo_config) as seo_optimizer:
            seo_prompt = (
                "Review the following blog post draft. Optimize it for SEO and GEO (Generative Engine Optimization) best practices "
                "without changing the frontmatter formatting. Output the optimized markdown.\n"
                f"\nDraft:\n{draft}"
            )
            seo_draft = await run_with_retry(seo_optimizer, seo_prompt)
        
        # 4. Tone Editing Phase
        logger.info("Step 4: Tone Editor is reviewing and scrubbing AI-isms...")
        async with Agent(tone_config) as tone_editor:
            tone_prompt = (
                "Review the following SEO-optimized draft. Ruthlessly scrub any AI-isms (like 'It's not just X, it's Y'). "
                "Ensure it sounds human, professional, yet conversational. Output the final, perfect markdown.\n"
                f"\nOptimized Draft:\n{seo_draft}"
            )
            final_content = await run_with_retry(tone_editor, tone_prompt)
        
        # 5. Publishing Phase
        logger.info("Step 5: Publisher is writing the file to the workspace...")
        async with Agent(publisher_config) as publisher:
            publish_prompt = (
                "I will provide you with the final markdown content. Your task is to write this exact content into a new file in the `src/blog/` directory. "
                "The filename should be short, kebab-case, and end in `.md`. Use your file writing tools to save the file. Do not perform any git operations.\n"
                f"\nContent:\n{final_content}"
            )
            await run_with_retry(publisher, publish_prompt)
            
        logger.info("Multi-Agent Pipeline execution completed successfully!")
    except Exception as e:
        logger.error(f"Pipeline failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())