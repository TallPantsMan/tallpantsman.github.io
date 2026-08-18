export default function(eleventyConfig) {
  // Pass through copy of images and assets
  eleventyConfig.addPassthroughCopy("src/assets/images");
  
  // Pass through CNAME file for GitHub Pages custom domain
  // eleventyConfig.addPassthroughCopy("src/CNAME");

  // Custom filter for readable dates
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
}

