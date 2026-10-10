import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const SAAS_URL = "https://006smmntnnc.corporateboostservice.eu";
const APP_NAME = "SmMntnnc";
const APP_FULL_NAME = "SmMntnnc – Smart Maintenance";
const ACCENT = "#b4ff3c";
const BG = "#06090f";
const BLUE = "#0a2a4a";

type Lang = "it" | "en" | "es" | "de";
const LANGS: Lang[] = ["it", "en", "es", "de"];

const T: Record<Lang, Record<string, string>> = {
  en: {
    tagline: "SMART MAINTENANCE, READY FOR SITE.",
    open: `Open ${APP_NAME} →`,
    license: "Access requires an active license. A one-time email verification code will be requested.",
    installed: `✅ Application installed and active as App.`,
    installTitle: `Install ${APP_NAME}`,
    installSub: "Get an icon on your desktop or home screen.",
    installBtn: "Install App",
    ios: "tap Share → Add to Home Screen",
    chrome: `click the install icon in the address bar (monitor with ↓ or "+"), or Menu ⋮ → "Install ${APP_NAME}".`,
    safari: "File → Add to Dock",
    android: "Menu ⋮ → Install app / Add to Home screen",
    already: "ℹ️ Already installed? Open it from your desktop, Start menu, Dock, or the \"Open in app\" icon in the address bar.",
    language: "Language",
  },
  it: {
    tagline: "MANUTENZIONE INTELLIGENTE, PRONTA PER IL CANTIERE.",
    open: `Apri ${APP_NAME} →`,
    license: "L'accesso richiede una licenza attiva. Verrà richiesto un codice di verifica email una tantum.",
    installed: "✅ Applicazione installata e attiva come App.",
    installTitle: `Installa ${APP_NAME}`,
    installSub: "Aggiungi un'icona sul desktop o sulla schermata Home.",
    installBtn: "Installa App",
    ios: "tocca Condividi → Aggiungi alla schermata Home",
    chrome: `clicca l'icona di installazione nella barra degli indirizzi (monitor con ↓ o "+"), oppure Menu ⋮ → "Installa ${APP_NAME}".`,
    safari: "File → Aggiungi al Dock",
    android: "Menu ⋮ → Installa app / Aggiungi a schermata Home",
    already: "ℹ️ Già installata? Aprila dal desktop, dal menu Start, dal Dock o dall'icona \"Apri nell'app\" nella barra degli indirizzi.",
    language: "Lingua",
  },
  es: {
    tagline: "MANTENIMIENTO INTELIGENTE, LISTO PARA LA OBRA.",
    open: `Abrir ${APP_NAME} →`,
    license: "El acceso requiere una licencia activa. Se solicitará un código de verificación por correo electrónico de un solo uso.",
    installed: "✅ Aplicación instalada y activa como App.",
    installTitle: `Instalar ${APP_NAME}`,
    installSub: "Añade un icono en el escritorio o en la pantalla de inicio.",
    installBtn: "Instalar App",
    ios: "toca Compartir → Añadir a pantalla de inicio",
    chrome: `haz clic en el icono de instalación de la barra de direcciones (monitor con ↓ o "+"), o Menú ⋮ → "Instalar ${APP_NAME}".`,
    safari: "Archivo → Añadir al Dock",
    android: "Menú ⋮ → Instalar app / Añadir a pantalla de inicio",
    already: "ℹ️ ¿Ya instalada? Ábrela desde el escritorio, el menú Inicio, el Dock o el icono \"Abrir en la app\" de la barra de direcciones.",
    language: "Idioma",
  },
  de: {
    tagline: "INTELLIGENTE WARTUNG, BEREIT FÜR DIE BAUSTELLE.",
    open: `${APP_NAME} öffnen →`,
    license: "Der Zugriff erfordert eine aktive Lizenz. Es wird ein einmaliger E-Mail-Bestätigungscode angefordert.",
    installed: "✅ Anwendung installiert und als App aktiv.",
    installTitle: `${APP_NAME} installieren`,
    installSub: "Füge ein Symbol auf dem Desktop oder Startbildschirm hinzu.",
    installBtn: "App installieren",
    ios: "tippe auf Teilen → Zum Home-Bildschirm",
    chrome: `klicke auf das Installationssymbol in der Adressleiste (Monitor mit ↓ oder "+") oder Menü ⋮ → "${APP_NAME} installieren".`,
    safari: "Ablage → Zum Dock hinzufügen",
    android: "Menü ⋮ → App installieren / Zum Startbildschirm",
    already: "ℹ️ Bereits installiert? Öffne sie über Desktop, Startmenü, Dock oder das Symbol \"In App öffnen\" in der Adressleiste.",
    language: "Sprache",
  },
};

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && LANGS.includes(saved)) return saved;
  } catch {}
  const code = (navigator.languages?.[0] || navigator.language || "en").slice(0, 2).toLowerCase();
  return (LANGS as string[]).includes(code) ? (code as Lang) : "en";
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: APP_FULL_NAME },
      { name: "description", content: T.en.tagline },
      { property: "og:title", content: APP_FULL_NAME },
      { property: "og:description", content: T.en.tagline },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
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
  const [lang, setLang] = useState<Lang>("en");
  const t = T[lang];

  const chooseLang = (l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setLang(detectLang());
    // Launcher is online-only: no service worker. Remove any legacy one.
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((rs) => rs.forEach((r) => r.unregister()))
        .catch(() => {});
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

  const langButtons = (
    <div
      role="group"
      aria-label={t.language}
      style={{ display: "flex", gap: 6, justifyContent: "flex-end", marginBottom: 12 }}
    >
      {LANGS.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            onClick={() => chooseLang(l)}
            aria-pressed={active}
            style={{
              background: active ? ACCENT : "transparent",
              color: active ? BG : "#9fb3c8",
              border: `1px solid ${active ? ACCENT : "#2b4a6b"}`,
              borderRadius: 999,
              padding: "3px 10px",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: 1,
            }}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );

  const boxBase = {
    marginTop: 32,
    border: `1px solid ${ACCENT}`,
    borderRadius: 16,
    padding: 20,
    maxWidth: 400,
    width: "100%",
    fontSize: 13,
    color: "#dbeafe",
    textAlign: "left" as const,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: BG,
        color: "#fff",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
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
          padding: "20px 36px",
          background: BLUE,
          border: `2px solid ${ACCENT}`,
          borderRadius: 20,
          boxShadow: `0 0 0 6px rgba(180,255,60,0.08), 0 20px 60px rgba(0,0,0,0.5)`,
          marginBottom: 28,
        }}
      >
        <span style={{ fontSize: 44, fontWeight: 900, letterSpacing: -1.5, lineHeight: 1 }}>
          <span style={{ color: ACCENT }}>Sm</span>
          <span style={{ color: "#ffffff" }}>Mntnnc</span>
        </span>
      </div>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.5, margin: "0 0 8px" }}>
        {APP_NAME}
        <span style={{ color: ACCENT }}> – Smart Maintenance</span>
      </h1>
      <p
        style={{
          fontSize: 13,
          letterSpacing: 2,
          color: ACCENT,
          margin: "0 0 36px",
          textTransform: "uppercase",
        }}
      >
        {t.tagline}
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
        {t.open}
      </a>
      <p style={{ maxWidth: 380, fontSize: 12, color: "#9fb3c8", margin: "12px 0 0" }}>{t.license}</p>

      {installed ? (
        <div style={{ ...boxBase, background: "rgba(180,255,60,0.12)" }}>
          {langButtons}
          <p style={{ margin: 0, fontWeight: 700, color: ACCENT, fontSize: 14 }}>{t.installed}</p>
        </div>
      ) : (
        <div style={{ ...boxBase, background: BLUE }}>
          {langButtons}
          <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#fff" }}>{t.installTitle}</p>
          <p style={{ margin: "0 0 14px", color: "#9fb3c8" }}>{t.installSub}</p>

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
              {t.installBtn}
            </button>
          )}

          {isIosSafari ? (
            <p style={{ margin: 0 }}>
              📱 <strong>iPhone / iPad:</strong> {t.ios}
            </p>
          ) : (
            <>
              <p style={{ margin: "0 0 10px" }}>
                💻 <strong>Chrome / Edge:</strong> {t.chrome}
              </p>
              <p style={{ margin: "0 0 10px" }}>
                🍏 <strong>Safari Mac:</strong> {t.safari}
              </p>
              <p style={{ margin: "0 0 10px" }}>
                🤖 <strong>Android:</strong> {t.android}
              </p>
            </>
          )}

          <p style={{ margin: "10px 0 0", borderTop: `1px solid ${ACCENT}30`, paddingTop: 10 }}>
            {t.already}
          </p>
        </div>
      )}

      <footer style={{ marginTop: 48, fontSize: 11, color: "#475569" }}>
        © {new Date().getFullYear()} {APP_NAME}
      </footer>
    </main>
  );
}
