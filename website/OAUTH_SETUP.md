# OAuth setup (Google & Apple sign-in)

`NEXTAUTH_SECRET` and `NEXTAUTH_URL` are already in `.env.local`. Complete the steps below to enable **Google** and **Apple** sign-in, then add the values to `.env.local`.

---

## 1. Google OAuth

1. Go to **[Google Cloud Console](https://console.cloud.google.com/)** and sign in.
2. Create or select a project (e.g. “Forge Fit Global”).
3. Open **APIs & Services** → **Credentials**.
4. Click **Create credentials** → **OAuth client ID**.
5. If asked, set **Application type** to **Web application** and configure the **OAuth consent screen** (app name, support email, dev contact).
6. Under **Application type** choose **Web application**.
7. **Name:** e.g. `Forge Fit Global Web`.
8. **Authorized redirect URIs** – click **Add URI** and add:
   - Local: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://forgefitglobal.com/api/auth/callback/google` (when you deploy)
9. Click **Create**. Copy the **Client ID** and **Client secret**.
10. In `website/.env.local` set:
    ```
    GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
    GOOGLE_CLIENT_SECRET=your-client-secret
    ```

---

## 2. Apple Sign In

1. Go to **[Apple Developer](https://developer.apple.com/account)** (requires a paid Apple Developer account).
2. **Certificates, Identifiers & Profiles** → **Identifiers**.
3. Create an **App ID** if you don’t have one (e.g. `com.forgefitglobal.app`), and enable **Sign in with Apple**.
4. Click **+** to add a new identifier → choose **Services IDs** → Continue.
5. **Description:** e.g. `Forge Fit Global Web`. **Identifier:** e.g. `com.forgefitglobal.web`. Register.
6. Enable **Sign in with Apple** for this Services ID, click **Configure**:
   - **Primary App ID:** select your App ID.
   - **Domains:** `forgefitglobal.com` (and for local testing you may need a tunnel like ngrok; Apple often requires HTTPS).
   - **Return URLs:** `https://forgefitglobal.com/api/auth/callback/apple` (and your ngrok URL if testing locally).
7. Save. Your **Services ID** (e.g. `com.forgefitglobal.web`) is your **APPLE_ID**.
8. **Client secret (JWT):** Apple doesn’t give a static secret; you generate a JWT:
   - Use **[bal.so/apple-gen-secret](https://bal.so/apple-gen-secret)** (or similar), or generate it yourself with your **Team ID**, **Key ID**, **Services ID**, and **private key** from Apple (Certificates, Identifiers & Profiles → Keys → create a key with “Sign in with Apple”).
   - The JWT is short‑lived (e.g. 6 months); regenerate when it expires.
9. In `website/.env.local` set:
   ```
   APPLE_ID=com.forgefitglobal.web
   APPLE_SECRET=your-generated-jwt
   ```

---

## 3. Production

When you deploy (e.g. Vercel):

- Set **NEXTAUTH_URL** to your live URL, e.g. `https://forgefitglobal.com`.
- Add the production callback URLs in Google and Apple (as above).
- Set the same env vars (including **NEXTAUTH_SECRET**) in your host’s environment; do not commit real secrets to git.

After saving `.env.local`, restart the dev server and try **Continue with Google** and **Continue with Apple** on `/login` and `/signup`.
