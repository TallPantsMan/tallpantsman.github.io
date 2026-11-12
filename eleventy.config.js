export default function(eleventyConfig) {
  // Pass through copy of images and assets
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/llms.txt");
  eleventyConfig.addPassthroughCopy("src/llms-full.txt");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  
  // Pass through CNAME file for GitHub Pages custom domain
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // Custom filter for readable dates
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    });
  });

  // Blog posts collection sorted by date descending
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
}

