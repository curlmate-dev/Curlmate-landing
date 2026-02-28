import { Fetcher } from "@cloudflare/workers-types";

export interface Env {  ASSETS: Fetcher}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {    
    const url = new URL(request.url);
    const herokuUrl = "https://app.curlmate.dev"; // Change this to your actual Heroku app URL

    // Serve CSS
    if (url.pathname === "/styles.css") {
      const css = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f5dc;
  color: #222;
  line-height: 1.6;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 2px solid #222;
}

.logo {
  height: 32px;
  width: auto;
}

.hero {
  text-align: center;
  padding: 4rem 0;
}

.hero h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

.hero p {
  font-size: 1.25rem;
  color: #444;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  background-color: #222;
  color: #f5f5dc;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
  border: 2px solid #222;
}

.cta-button:hover {
  background-color: transparent;
  color: #222;
}

.gif-section {
  padding: 3rem 0;
  border-top: 1px solid #ccc;
  margin-top: 2rem;
}

.gif-section h2 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.gif-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.gif-card {
  background: white;
  border: 2px solid #222;
  border-radius: 8px;
  padding: 1rem;
}

.gif-card h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.gif-card img {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;
}

.feature {
  text-align: center;
  padding: 1.5rem;
  border: 1px solid #222;
  border-radius: 8px;
  background: white;
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.feature h3 {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.feature p {
  font-size: 0.9rem;
  color: #555;
}

footer {
  text-align: center;
  padding: 2rem 0;
  margin-top: 3rem;
  border-top: 1px solid #ccc;
  font-size: 0.9rem;
  color: #666;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.social-links a {
  color: #666;
  transition: color 0.2s;
}

.social-links a:hover {
  color: #333;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: #666;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .hero h1 {
    font-size: 2rem;
  }
  
  .container {
    padding: 1rem;
  }
  
  .gif-grid {
    grid-template-columns: 1fr;
  }
}`;
      return new Response(css, {
        headers: { "Content-Type": "text/css" },
      });
    }

    if (url.pathname === "/docs" || url.pathname.startsWith("/docs/")) {
      const destinationUrl = `${herokuUrl}/apidocs${url.search}`;
      return Response.redirect(destinationUrl, 302);
    }
    
    // Redirect TOS and Privacy pages to heroku app for single source of truth and to avoid duplication
    if (url.pathname.startsWith("/tos") || url.pathname.startsWith("/terms")){
      const destinationUrl = `${herokuUrl}/tos.html${url.search}`;
      return Response.redirect(destinationUrl, 302);
    }

    if (url.pathname.startsWith("/privacy") || url.pathname.startsWith("/policy")){
      const destinationUrl = `${herokuUrl}/privacy.html${url.search}`;
      return Response.redirect(destinationUrl, 302);
    }
    
    if (url.pathname.startsWith("/faq")) {
      const destinationUrl = `${herokuUrl}/faq.html${url.search}`;
      return Response.redirect(destinationUrl, 302);
    }
    
    // Redirect older callbacks to heroku app for compatibility
    if ( url.pathname.startsWith("/callback")) {
      const destinationUrl = `${herokuUrl}${url.pathname}${url.search}`;
      return Response.redirect(destinationUrl, 302);
    }
    return env.ASSETS.fetch(request);
  },
};
