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

# --- Prompt Templates ---
TOPIC_PROMPT = """
You are the Topic Researcher for Caulhaus Consulting Group.
Pick a marketing trend or a systems automation trend (like setting up Google Workspace automations via AppScript).
It must align with our core competencies.
Write a detailed outline for a blog post.
"""

DRAFT_PROMPT = """
You are the Content Generator for Caulhaus Consulting Group.
Using the following research outline, draft a comprehensive, engaging blog post.
CRITICAL VISUAL RULE 1 - TITLES MUST BE SHORT: The title MUST be short, punchy, and no longer than 6 words.
CRITICAL VISUAL RULE 2 - H1 REQUIRED: Your markdown body MUST start with a single `# H1` heading containing the exact short title.
CRITICAL VISUAL RULE 3 - NO RICH MEDIA: Do not include featured images, cover images, or excerpts. Use standard markdown.
CRITICAL FRONTMATTER RULE: You MUST include frontmatter containing `title`, `date` (YYYY-MM-DD), and `categories` (a single string). Do NOT use tags.
"""

SEO_PROMPT = """
You are the SEO Optimizer. Review the following blog post draft.
Optimize it for SEO and GEO (Generative Engine Optimization) best practices without changing the frontmatter formatting.
Output the optimized markdown.
"""

TONE_PROMPT = """
You are the Tone Editor. Review the following SEO-optimized draft.
Ruthlessly scrub any AI-isms (like "It's not just X, it's Y"). Ensure it sounds human, professional, yet conversational.
Output the final, perfect markdown.
"""

PUBLISH_PROMPT = """
You are the Publisher. I will provide you with the final markdown content.
Your task is to write this exact content into a new file in the `src/blog/` directory.
The filename should be short, kebab-case, and end in `.md`.
Use your file writing tools to save the file. Do not perform any git operations.
"""

async def run_with_retry(agent, prompt, max_retries=3):
    """Executes a prompt against the agent with robust retry logic for API timeouts."""
    for attempt in range(max_retries):
        try:
            # We use chat() for headless execution. It returns when the turn completes.
            response = await agent.chat(prompt)
            return response.text
        except Exception as e:
            logger.warning(f"Attempt {attempt + 1} failed: {e}")
            if attempt == max_retries - 1:
                logger.error("Max retries reached. Failing workflow.")
                raise
            await asyncio.sleep(5)

async def main():
    # 1. Environment & Dependencies Validation
    if not os.environ.get("GEMINI_API_KEY"):
        logger.error("GEMINI_API_KEY environment variable is missing. Cannot start agent.")
        sys.exit(1)

    logger.info("Initializing Antigravity Serverless Pipeline...")
    
    # 2. Setup headless agent config
    config = LocalAgentConfig(
        system_instructions="You are an elite automated blog writing AI. You must use your tools and reasoning to fulfill the prompts.",
        capabilities=CapabilitiesConfig(),
    )

    try:
        # 3. Autonomous Workflow Execution
        async with Agent(config) as agent:
            logger.info("Step 1: Generating Topic & Outline...")
            topic_outline = await run_with_retry(agent, TOPIC_PROMPT)
            
            logger.info("Step 2: Drafting Content...")
            draft = await run_with_retry(agent, f"{DRAFT_PROMPT}\n\nOutline:\n{topic_outline}")
            
            logger.info("Step 3: Optimizing for SEO/GEO...")
            seo_draft = await run_with_retry(agent, f"{SEO_PROMPT}\n\nDraft:\n{draft}")
            
            logger.info("Step 4: Tone Editing...")
            final_content = await run_with_retry(agent, f"{TONE_PROMPT}\n\nOptimized Draft:\n{seo_draft}")
            
            logger.info("Step 5: Writing File to Workspace...")
            await run_with_retry(agent, f"{PUBLISH_PROMPT}\n\nContent:\n{final_content}")
            
        logger.info("Pipeline execution completed successfully!")
    except Exception as e:
        logger.error(f"Pipeline failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())