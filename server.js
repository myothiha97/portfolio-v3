import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

async function createServer() {
  const app = express();

  // Parse JSON bodies for API routes
  app.use(express.json());

  let vite;
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;
    app.use(compression());
    app.use('/assets', sirv(path.resolve(__dirname, 'dist/client/assets'), { immutable: true }));
    app.use(sirv(path.resolve(__dirname, 'dist/client'), { extensions: [] }));
  }

  // ── Contact form API ──
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: 'mthk97.dev@gmail.com',
          reply_to: email,
          subject: `Portfolio Contact from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px;">
              <h2 style="color: #333;">New message from your portfolio</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Resend API error');
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Email send error:', error);
      res.status(500).json({ error: 'Failed to send email.' });
    }
  });

  // ── SSR catch-all (must be after API routes) ──
  app.use('/{*splat}', async (req, res) => {
    const url = req.originalUrl;

    try {
      let template;
      let render;

      if (!isProduction) {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8');
        render = (await import('./dist/server/entry-server.js')).render;
      }

      const { html: appHtml } = render(url);
      const html = template.replace('<!--ssr-outlet-->', appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (!isProduction) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();
