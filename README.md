# Caulhaus Consulting Website (Static Rebuild)

A lightning-fast, static B2B automation consulting website built with **Eleventy (11ty) v3** and **Tailwind CSS v4**. It is fully pre-configured for automatic builds and deployments to **GitHub Pages**.

---

## Features

1. **Static & Optimized**: Pre-renders HTML pages and compiles Tailwind CSS v4, loading in milliseconds.
2. **6 Core Pages**: Home, Services, Projects, About Us, Contact Us, and Blog.
3. **Headless Contact Form**: Integrates Web3Forms for form handling with client-side AJAX interception for an inline success screen.
4. **Markdown Blog**: Blog posts read automatically from Markdown files inside `/src/blog/` using YAML front matter.
5. **Interactive Savings Calculator**: Located on the Services page, calculating cost of manual friction and automation ROI live in JS.
6. **Projects Filter**: Zero-dependency category filters on the Projects page.

---

## Local Development

To preview and develop the website locally, you'll need **Node.js** and **npm** installed on your system.

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm start
   ```
   This compiles your CSS and templates, launches a local server at `http://localhost:8080`, and watches for any changes.

3. **Build for Production**:
   ```bash
   npm run build
   ```
   This generates a minified, production-ready version of your site in the `_site` directory.

---

## Deployment to GitHub Pages (Automated)

We have included a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`. 

To deploy your site:
1. Push this project folder to a repository on **GitHub** (e.g. `caulhaus/caulhaus.github.io` or a custom repository).
2. Go to your repository settings: **Settings > Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Whenever you push changes to the `main` or `master` branch, GitHub will automatically compile the Eleventy site, build your Tailwind CSS, and publish it to your GitHub Pages domain!

---

## Customizations

### 1. Contact Form Endpoint
The form is currently wired to submit to **Web3Forms** (`https://api.web3forms.com/submit`).
1. Visit [Web3Forms](https://web3forms.com/) and enter your email to get a free access key.
2. Open `src/contact.njk`.
3. Locate this line:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
   Replace `YOUR_ACCESS_KEY_HERE` with your access key. Web3Forms will forward submissions directly to your email without any backend code!

### 2. Adding Blog Posts
To publish a new blog post, simply create a `.md` file inside the `src/blog/` directory.

Use this front matter template:
```markdown
---
title: "Your Post Title"
date: YYYY-MM-DD
description: "A short, 1-2 sentence description for search results and previews."
layout: post.njk
tags: ["blog", "business-automation-strategies"]
author: "Your Name"
readTime: "4 min"
---

## Your First Heading
Your post content here in Markdown...
```
Eleventy will automatically parse the file, compile it to HTML using the layout template, and append it to the `/blog/` index list.
