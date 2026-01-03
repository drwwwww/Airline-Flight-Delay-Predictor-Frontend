# Flight Predictor Frontend

Vite + React single-page app for the Flight Delay Predictor. Connects to the FastAPI backend via `VITE_API_URL`.

## Local dev

```bash
npm install
npm run dev
```

Create a `.env.local` or `.env.production` with:

```
VITE_API_URL=http://localhost:8000
```

## Production build

```bash
npm run build
```

Deploy easily on Vercel/Netlify. Set `VITE_API_URL` to your backend URL.