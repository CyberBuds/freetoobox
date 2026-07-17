import express from "express";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware for API routes and proxy
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API proxy to Onrender blog API
  app.all("/api/blog-api/*", async (req, res) => {
    const targetPath = req.originalUrl.replace(/^\/api\/blog-api/, "");
    const targetUrl = `https://blogservice-api.onrender.com${targetPath}`;
    
    console.log(`[Blog API Proxy] Forwarding ${req.method} request to: ${targetUrl}`);
    
    const headers = new Headers();
    
    // Copy headers from original request except host and connection
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === "string" && !["host", "connection", "accept-encoding", "content-length"].includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    }
    
    // Default TenantId to site1
    if (!headers.has("TenantId") && !headers.has("tenantid")) {
      headers.set("TenantId", "site1");
    }
    
    // Securely inject API Key or Bearer Token from server environment variables
    if (process.env.BLOG_API_KEY) {
      headers.set("X-API-Key", process.env.BLOG_API_KEY);
    } else if (process.env.BLOG_BEARER_TOKEN) {
      headers.set("Authorization", `Bearer ${process.env.BLOG_BEARER_TOKEN}`);
    }
    
    try {
      const fetchOptions: RequestInit = {
        method: req.method,
        headers: headers,
      };
      
      if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method) && req.body && Object.keys(req.body).length > 0) {
        fetchOptions.body = JSON.stringify(req.body);
        headers.set("Content-Type", "application/json");
      }
      
      const apiResponse = await fetch(targetUrl, fetchOptions);
      
      const contentType = apiResponse.headers.get("content-type");
      if (contentType) {
        res.setHeader("Content-Type", contentType);
      }
      
      res.status(apiResponse.status);
      
      if (contentType && contentType.includes("application/json")) {
        const data = await apiResponse.json();
        res.json(data);
      } else {
        const data = await apiResponse.text();
        res.send(data);
      }
    } catch (error: any) {
      console.error("[Blog API Proxy] Proxy request failed:", error);
      res.status(500).json({ 
        error: "Proxy connection failed", 
        message: error.message 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in development mode with Vite middleware...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve static files from dist
    // When bundled to dist/server.cjs, __dirname is the dist folder itself
    const distPath = __dirname;
    console.log(`Starting in production mode. Serving static files from: ${distPath}`);
    
    app.use(express.static(distPath));
    
    // Catch-all route for SPA
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error(`Error sending index.html from ${indexPath}:`, err);
          res.status(500).send("Error loading application");
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT} (host: 0.0.0.0)`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
