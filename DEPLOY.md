# Backend Deployment Guide (Render)

Your frontend is deployed on Vercel, but it needs a live backend to work. Follow these steps to deploy your backend to **Render** for free.

## 1. Push to GitHub
Ensure all your latest changes are committed and pushed to your GitHub repository.

## 2. Deploy on Render
1.  Go to [dashboard.render.com](https://dashboard.render.com/) and log in/sign up.
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub repository.
4.  Configure the service:
    *   **Name**: `algo-forge-backend` (or similar)
    *   **Root Directory**: `backend` (⚠️ Important)
    *   **Environment**: `Node`
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm start`
5.  **Environment Variables** (Click 'Advanced' or 'Environment Variables'):
    Add the following variables (copy values from your local `.env` file):
    *   `MONGO_URI`: `...` (Your MongoDB connection string)
    *   `JWT_SECRET`: `...` (Your secret key)
    *   `GOOGLE_CLIENT_ID`: `...` (Your Google Client ID)
    *   `CLIENT_URL`: `https://algo-forge-2-0.vercel.app` (Your deployed frontend URL)
6.  Click **Create Web Service**.

## 3. Connect Frontend
Once Render finishes deploying (it might take a few minutes), verify the URL (e.g., `https://algo-forge-backend.onrender.com`).

1.  Go to your **Vercel Dashboard**.
2.  Select your project -> **Settings** -> **Environment Variables**.
3.  Add/Update:
    *   **Key**: `VITE_API_BASE_URL`
    *   **Value**: `https://algo-forge-backend.onrender.com` (Your new Render URL)
4.  **Redeploy** on Vercel (Deployments -> Redeploy) for the changes to take effect.
