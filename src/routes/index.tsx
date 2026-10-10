import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const SAAS_URL = "https://006smmntnnc.corporateboostservice.eu";
const APP_NAME = "SmMntnnc";
const APP_FULL_NAME = "SmMntnnc – Smart Maintenance";
const TAGLINE_EN = "SMART MAINTENANCE, READY FOR SITE.";
const TAGLINE_IT = "MANUTENZIONE INTELLIGENTE, PRONTA PER IL CANTIERE.";
const ACCENT = "#b4ff3c";
const BG = "#06090f";
const BLUE = "#0a2a4a";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: APP_FULL_NAME },
      { name: "description", content: `${TAGLINE_EN} · ${TAGLINE_IT}` },
      { property: "og:title", content: APP_FULL_NAME },
      { property: "og:description", content: `${TAGLINE_EN} · ${TAGLINE_IT}` },
      { property: "og:image", content: "/icons/icon-512x512.png" },
    ],
  }),
  component: Landing,
});

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function Landing() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isIosSafari, setIsIosSafari] = useState(false);

  useEffect(() => {
    // Register service worker only on production HTTPS (not Lovable preview/dev).
    if (typeof window === "undefined") return;
    const host = window.location.hostname;
    const isPreview =
      host.startsWith("id-preview--") ||
      host.startsWith("preview--") ||
      host.endsWith(".lovableproject.com") ||
      host.endsWith(".lovableproject-dev.com") ||
      host.endsWith(".beta.lovable.dev") ||
      host === "localhost" ||
      host === "127.0.0.1";
    if ("serviceWorker" in navigator && !isPreview && window.isSecureContext) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    } else if ("serviceWorker" in navigator && isPreview) {
      navigator.serviceWorker.getRegistrations().then((rs) =>
        rs.forEach((r) => {
          if (r.active?.scriptURL.endsWith("/sw.js")) r.unregister();
        }),
      );
    }

    const ua = window.navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
    const safari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    setIsIosSafari(iOS && safari && !standalone);
    setInstalled(standalone);

    const onBIP = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: BG,
        color: "#fff",
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px",
        textAlign: "center",
      }}
    >
      <div
        aria-label="SmMntnnc logo"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 36px",
          background: BLUE,
          border: `2px solid ${ACCENT}`,
          borderRadius: 20,
          boxShadow: `0 0 0 6px rgba(180,255,60,0.08), 0 20px 60px rgba(0,0,0,0.5)`,
          marginBottom: 28,
        }}
      >
        <span
          style={{
            fontSize: 44,
            fontWeight: 900,
            letterSpacing: -1.5,
            lineHeight: 1,
          }}
        >
          <span style={{ color: ACCENT }}>Sm</span>
          <span style={{ color: "#ffffff" }}>Mntnnc</span>
        </span>
      </div>
      <h1
        style={{
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: -0.5,
          margin: "0 0 8px",
        }}
      >
        {APP_NAME}
        <span style={{ color: ACCENT }}> – Smart Maintenance</span>
      </h1>
      <p
        style={{
          fontSize: 13,
          letterSpacing: 2,
          color: "#9fb3c8",
          margin: "0 0 6px",
          textTransform: "uppercase",
        }}
      >
        {TAGLINE_EN}
      </p>
      <p
        style={{
          fontSize: 13,
          letterSpacing: 2,
          color: ACCENT,
          margin: "0 0 36px",
          textTransform: "uppercase",
        }}
      >
        <span lang="it">{TAGLINE_IT}</span>
      </p>

      <a
        href={SAAS_URL}
        style={{
          display: "inline-block",
          background: ACCENT,
          color: BG,
          fontWeight: 700,
          padding: "14px 28px",
          borderRadius: 12,
          textDecoration: "none",
          fontSize: 16,
          boxShadow: `0 8px 24px rgba(180,255,60,0.25)`,
        }}
      >
        Open SmMntnnc / Apri SmMntnnc →
      </a>

      {installed && (
        <div
          style={{
            marginTop: 32,
            background: "rgba(180,255,60,0.12)",
            border: `1px solid ${ACCENT}`,
            borderRadius: 16,
            padding: 16,
            maxWidth: 360,
            width: "100%",
            fontSize: 14,
          }}
        >
          <p style={{ margin: "0 0 4px", fontWeight: 700, color: ACCENT }}>
            ✅ App installed & running in standalone mode
          </p>
          <p style={{ margin: 0, color: "#dbeafe", fontSize: 13 }} lang="it">
            ✅ Applicazione installata e attiva come App
          </p>
        </div>
      )}

      {!installed && (
        <div
          style={{
            marginTop: 32,
            background: BLUE,
            border: `1px solid ${ACCENT}`,
            borderRadius: 16,
            padding: 20,
            maxWidth: 400,
            width: "100%",
            textAlign: "left",
            fontSize: 13,
            color: "#dbeafe",
          }}
        >
          <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#fff" }}>
            Install {APP_NAME} / Installa {APP_NAME}
          </p>
          <p style={{ margin: "0 0 14px", color: "#9fb3c8" }}>
            Get an icon on your desktop or home screen. ·{" "}
            <span lang="it">
              Aggiungi un'icona sul desktop o sulla schermata Home.
            </span>
          </p>

          {deferred && (
            <button
              onClick={handleInstall}
              style={{
                background: ACCENT,
                color: BG,
                border: "none",
                fontWeight: 700,
                padding: "10px 20px",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 14,
                marginBottom: 14,
                width: "100%",
              }}
            >
              Install App / Installa App
            </button>
          )}

          {isIosSafari ? (
            <>
              <p style={{ margin: "0 0 4px" }}>
                📱 <strong>iPhone / iPad:</strong> tap <strong>Share</strong> → <strong>Add to Home Screen</strong>
              </p>
              <p style={{ margin: 0, color: "#9fb3c8" }} lang="it">
                Tocca <strong>Condividi</strong> → <strong>Aggiungi a schermata Home</strong>
              </p>
            </>
          ) : (
            <>
              <p style={{ margin: "0 0 4px" }}>
                💻 <strong>Chrome / Edge:</strong> click the install icon in the address bar (monitor with ↓ or "+"), or Menu ⋮ → "Install {APP_NAME}".
              </p>
              <p style={{ margin: "0 0 10px", color: "#9fb3c8" }} lang="it">
                Clicca l'icona di installazione nella barra degli indirizzi (monitor con ↓ o "+"), oppure Menu ⋮ → "Installa {APP_NAME}".
              </p>
              <p style={{ margin: "0 0 4px" }}>
                🍏 <strong>Safari Mac:</strong> File → Add to Dock
              </p>
              <p style={{ margin: "0 0 10px", color: "#9fb3c8" }} lang="it">File → Aggiungi al Dock</p>
              <p style={{ margin: "0 0 4px" }}>
                🤖 <strong>Android:</strong> Menu ⋮ → Install app / Add to Home screen
              </p>
              <p style={{ margin: "0 0 10px", color: "#9fb3c8" }} lang="it">Menu ⋮ → Installa app / Aggiungi a schermata Home</p>
            </>
          )}

          <p style={{ margin: "10px 0 4px", borderTop: `1px solid ${ACCENT}30`, paddingTop: 10 }}>
            ℹ️ Already installed? Open it from your desktop, Start menu, Dock, or the "Open in app" icon in the address bar.
          </p>
          <p style={{ margin: 0, color: "#9fb3c8" }} lang="it">
            Già installata? Aprila dal desktop, dal menu Start, dal Dock o dall'icona "Apri nell'app" nella barra degli indirizzi.
          </p>
        </div>
      )}

      <footer style={{ marginTop: 48, fontSize: 11, color: "#475569" }}>
        © {new Date().getFullYear()} {APP_NAME}
      </footer>
    </main>
  );
}
