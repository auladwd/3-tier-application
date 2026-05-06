// ============================================================
// _app.js - Next.js App wrapper
// Imports global CSS and wraps all pages
// ============================================================

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
