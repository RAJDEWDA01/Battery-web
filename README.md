# Battery Web

Client-ready landing page for VK Power and MK Gold two-wheeler batteries, with click tracking and lightweight analytics.

## Stack

- `frontend/`: React + Vite landing page
- `backend/`: Express + MongoDB API with in-memory fallback for local development

## What Was Made Client-Ready

- Business contact details moved to frontend env config instead of hardcoded placeholders
- Analytics endpoint can be protected with an API key
- Click tracking has per-device rate limiting
- Backend can serve the built frontend in production
- Anonymous testimonial labels replace fake full names
- Added API tests and deployment env examples

## Frontend Setup

Copy `frontend/.env.example` to `frontend/.env` and set the real client values:

```powershell
cd frontend
Copy-Item .env.example .env
```

Important values:

- `VITE_WHATSAPP_NUMBER`: digits only, for example `919876543210`
- `VITE_CALL_NUMBER`: optional if calls use a different number
- `VITE_DISPLAY_PHONE`: the formatted number shown on the page
- `VITE_BUSINESS_LOCATION`: the city or service area shown on the page
- `VITE_API_BASE_URL`: leave empty when frontend and backend share one domain; otherwise set the backend origin

## Backend Setup

Copy `backend/.env.example` to `backend/.env` and set production values:

```powershell
cd backend
Copy-Item .env.example .env
```

Important values:

- `MONGODB_URI`: production MongoDB connection string
- `CLIENT_ORIGIN`: comma-separated allowed frontend origins
- `ANALYTICS_API_KEY`: private key for `/api/analytics`
- `SERVE_FRONTEND=true`: lets Express serve `frontend/dist` in production

## Local Development

Start the backend:

```powershell
cd backend
npm install
npm run dev
```

Start the frontend in another terminal:

```powershell
cd frontend
npm install
npm run dev
```

## Production Build

Build the frontend:

```powershell
cd frontend
npm install
npm run build
```

Start the backend:

```powershell
cd ..\backend
npm install
npm start
```

If `SERVE_FRONTEND=true`, the backend serves the built frontend and API from the same deployment.

## Testing

Backend tests:

```powershell
cd backend
npm test
```

Frontend production build:

```powershell
cd frontend
npm run build
```
