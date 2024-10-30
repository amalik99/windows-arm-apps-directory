import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import fetch from 'node-fetch';
import { globby } from 'globby';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const WEBSITE_URL = 'https://windowsarm.org';

async function generateSitemap() {
  try {
    // Fetch apps data for dynamic routes
    const dataUrl = 'https://raw.githubusercontent.com/amalik99/windows-arm-apps-directory/refs/heads/main/data/apps.json';
    const response = await fetch(dataUrl);
    const data = await response.json();
    
    // Get all static pages
    const pages = await globby([
      'app/**/page.tsx',
      '!app/**/[*]/**', // Exclude dynamic route folders
      '!app/api/**', // Exclude API routes
    ]);

    // Generate static routes
    const staticRoutes = pages.map((page) => {
      const path = page
        .replace('app', '')
        .replace('/page.tsx', '')
        .replace(/\/+/g, '/') // Clean up multiple forward slashes
        .replace(/^\/+|\/+$/g, ''); // Remove leading/trailing slashes
      
      // Handle root path specially
      if (path === '') {
        return WEBSITE_URL;
      }
      return `${WEBSITE_URL}/${path}`;
    });

    // Generate dynamic app routes
    const appRoutes = data.apps.map((app) => {
      return `${WEBSITE_URL}/app/${encodeURIComponent(app.slug)}`;
    });

    // Generate category routes
    const categories = [...new Set(data.apps.map(app => app.category))];
    const categoryRoutes = categories.map(category => {
      return `${WEBSITE_URL}/category/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`;
    });

    // Combine all routes and remove duplicates
    const allRoutes = [...new Set([...staticRoutes, ...appRoutes, ...categoryRoutes])];

    const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allRoutes
          .map((url) => {
            return `
              <url>
                <loc>${url}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
              </url>
            `;
          })
          .join('')}
      </urlset>
    `;

    const formatted = await prettier.format(sitemap, {
      parser: 'html',
    });

    // Ensure public directory exists
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public', { recursive: true });
    }

    // Write to the correct output location
    fs.writeFileSync('public/sitemap.xml', formatted);
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();