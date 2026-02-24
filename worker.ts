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
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.logo span {
  color: #666;
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

    // Proxy specific routes to the app
    if (url.pathname.startsWith("/apidocs") || url.pathname.startsWith("/tos") || url.pathname.startsWith("/privacy")) {
      const destinationUrl = `${herokuUrl}${url.pathname}${url.search}`;
      return fetch(destinationUrl, {
        headers: {
          "User-Agent": request.headers.get("User-Agent") || "",
          "Accept": request.headers.get("Accept") || "",
        },
      });
    }

    // Redirect API routes to Heroku
    if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/auth/") || url.pathname.startsWith("/callback")) {
      const destinationUrl = `${herokuUrl}${url.pathname}${url.search}`;
      return Response.redirect(destinationUrl, 301);
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
      <div class="logo">curl<span>mate</span></div>
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
