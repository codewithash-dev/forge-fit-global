"use client";

import Script from "next/script";

const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

/**
 * Loads the Crisp chat widget when NEXT_PUBLIC_CRISP_WEBSITE_ID is set.
 * Get your ID at https://app.crisp.chat/ (Settings → Setup & Integration → Website ID).
 * Crisp offers a free tier and optional AI/bot add-ons.
 */
export default function CrispProvider() {
  if (!CRISP_WEBSITE_ID) return null;

  return (
    <>
      <Script
        id="crisp-config"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="${CRISP_WEBSITE_ID}";`,
        }}
      />
      <Script
        id="crisp-script"
        strategy="lazyOnload"
        src="https://client.crisp.chat/l.js"
      />
    </>
  );
}
