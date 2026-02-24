export default {
  async fetch(request: Request): Promise<Response> {
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

    // Serve the landing page for all other routes
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CurlMate - API Testing Made Simple</title>
  <link rel="stylesheet" href="/styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
</head>
<body>
  <div class="container">
    <header>
      <img src="/logo.png" alt="CurlMate" class="logo">
      <a href="${herokuUrl}" class="cta-button" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">Launch App</a>
    </header>

    <section class="hero">
      <h1>API Testing.<br>Without the headache.</h1>
      <p>The elegant way to test APIs with OAuth, JWT, and token management built right in.</p>
      <a href="${herokuUrl}" class="cta-button">Get Started Free</a>
    </section>

    <section class="features">
      <div class="feature">
        <div class="feature-icon">🔐</div>
        <h3>OAuth Integration</h3>
        <p>Connect to APIs with OAuth 1.0, 2.0, and PKCE flows in seconds.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">🔑</div>
        <h3>JWT Handling</h3>
        <p>Automatic token refresh and JWT validation without the hassle.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">📦</div>
        <h3>Request History</h3>
        <p>Save and organize your API requests with built-in storage.</p>
      </div>
    </section>

    <section class="gif-section">
      <h2>See CurlMate in Action</h2>
      
      <div class="gif-grid">
        <div class="gif-card">
          <h3>Make API Requests</h3>
          <img src="https://placehold.co/600x400/f5f5dc/222?text=API+Request+Demo" alt="Making API requests with CurlMate">
        </div>
        
        <div class="gif-card">
          <h3>OAuth Authentication</h3>
          <img src="https://placehold.co/600x400/f5f5dc/222?text=OAuth+Demo" alt="OAuth flow demo">
        </div>
        
        <div class="gif-card">
          <h3>Token Management</h3>
          <img src="https://placehold.co/600x400/f5f5dc/222?text=Token+Management" alt="Token management demo">
        </div>
        
        <div class="gif-card">
          <h3>Response Handling</h3>
          <img src="https://placehold.co/600x400/f5f5dc/222?text=Response+View" alt="Response handling demo">
        </div>
      </div>
    </section>

    <footer>
      <div class="social-links">
        <a href="https://twitter.com/curlmate" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://linkedin.com/company/curlmate" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="https://github.com/curlmate-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
      </div>
      <div class="footer-links">
        <a href="/tos">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
      <p>&copy; 2026 CurlMate. Built for developers, by developers.</p>
    </footer>
  </div>
</body>
</html>`;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
};
