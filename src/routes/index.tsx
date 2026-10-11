import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/smmntnnc-logo.png.asset.json";

import { APP_CONFIG, APP_FULL_NAME, APP_DESCRIPTION } from "@/config/app";

const SAAS_URL = APP_CONFIG.saasUrl;
const APP_NAME = APP_CONFIG.name;
const ACCENT = APP_CONFIG.colors.accent;
const BG = APP_CONFIG.colors.bg;
const BLUE = APP_CONFIG.colors.theme;

type Lang = "it" | "en" | "es" | "de";
const LANGS: Lang[] = ["it", "en", "es", "de"];

const T: Record<Lang, Record<string, string>> = {
  en: {
    tagline: APP_CONFIG.tagline.en,
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
    uninstallTitle: `How to uninstall or remove ${APP_NAME}`,
    uninstallSub: "You have full control. You can remove the app and its data at any time:",
    uninstallEdge: "In the app window: click \"...\" in the top-right corner → App settings ⚙️ → Uninstall.",
    uninstallMac: "Open Finder → Applications folder → drag the app to Trash.",
    uninstallPhone: "Press and hold the app icon on your home screen → Delete / Uninstall.",
    clearDataBtn: "Clear local data & reset",
    dataCleared: "✅ Local data cleared successfully.",
  },
  it: {
    tagline: APP_CONFIG.tagline.it,
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
    uninstallTitle: `Come disinstallare o rimuovere ${APP_NAME}`,
    uninstallSub: "Massima trasparenza: puoi rimuovere l'app e liberare spazio in qualsiasi momento:",
    uninstallEdge: "Dalla finestra dell'app: clicca i tre puntini \"...\" in alto a destra ➔ Impostazioni app ⚙️ ➔ Disinstalla.",
    uninstallMac: "Apri il Finder ➔ cartella Applicazioni ➔ trascina l'icona nel Cestino.",
    uninstallPhone: "Tieni premuta l'icona sulla schermata Home ➔ Elimina / Disinstalla.",
    clearDataBtn: "Ripristina e cancella dati locali",
    dataCleared: "✅ Dati locali cancellati con successo.",
  },
  es: {
    tagline: APP_CONFIG.tagline.es,
    open: `Abrir ${APP_NAME} →`,
    license: "El acceso requiere una licencia activa. Se solicitará un código de verificación por correo electrónico de un solo uso.",
    installed: "✅ Aplicación instalada e activa como App.",
    installTitle: `Instalar ${APP_NAME}`,
    installSub: "Añade un icono en el escritorio o en la pantalla de inicio.",
    installBtn: "Instalar App",
    ios: "toca Compartir → Añadir a pantalla de inicio",
    chrome: `haz clic en el icono de instalación de la barra de direcciones (monitor con ↓ o "+"), o Menú ⋮ → "Instalar ${APP_NAME}".`,
    safari: "Archivo → Añadir al Dock",
    android: "Menú ⋮ → Instalar app / Añadir a pantalla de inicio",
    already: "ℹ️ ¿Ya instalada? Ábrela desde el escritorio, el menú Inicio, el Dock o el icono \"Abrir en la app\" de la barra de direcciones.",
    language: "Idioma",
    uninstallTitle: `Cómo desinstalar o eliminar ${APP_NAME}`,
    uninstallSub: "Control total: puedes eliminar la aplicación y sus datos en cualquier momento:",
    uninstallEdge: "En la ventana de la app: haz clic en \"...\" arriba a la derecha ➔ Configuración de app ⚙️ ➔ Desinstalar.",
    uninstallMac: "Abre Finder ➔ carpeta Aplicaciones ➔ arrastra el icono a la Papelera.",
    uninstallPhone: "Mantén presionado el icono en la pantalla de inicio ➔ Eliminar / Desinstalar.",
    clearDataBtn: "Restablecer y borrar datos locales",
    dataCleared: "✅ Datos locales eliminados con éxito.",
  },
  de: {
    tagline: APP_CONFIG.tagline.de,
    open: `${APP_NAME} öffnen →`,
    license: "Der Zugriff erfordert eine aktive Lizenz. Es wird ein einmaliger E-Mail-Bestätigungscode angefordert.",
    installed: "✅ Anwendung installiert und als App aktiv.",
    installTitle: `${APP_NAME} installieren`,
    installSub: "Füge ein Symbol auf dem Desktop oder Startbildschirm hinzu.",
    installBtn: "App installieren",
    ios: "tippe auf Teilen → Zum Home-Bildschirm",
    chrome: `klicke auf das Installationssymbol in der Adressleiste (Monitor mit ↓ oder "+") oder Menü ⋮ → "${APP_NAME} installieren".`,
    safari: "Ablage → Zum Dock hinzufügen",
    android: "Menü ⋮ → App installieren / Zum Startbildschirm hinzufügen",
    already: "ℹ️ Bereits installiert? Öffne sie über den Desktop, das Startmenü, das Dock oder das Symbol \"In App öffnen\" in der Adressleiste.",
    language: "Sprache",
    uninstallTitle: `${APP_NAME} deinstallieren oder entfernen`,
    uninstallSub: "Volle Kontrolle: Du kannst die App und ihre Daten jederzeit entfernen:",
    uninstallEdge: "Im App-Fenster: oben rechts auf \"...\" klicken ➔ App-Einstellungen ⚙️ ➔ Deinstallieren.",
    uninstallMac: "Finder öffnen ➔ Ordner Programme ➔ Symbol in den Papierkorb ziehen.",
    uninstallPhone: "App-Symbol auf dem Startbildschirm gedrückt halten ➔ Löschen / Deinstallieren.",
    clearDataBtn: "Lokale Daten löschen & zurücksetzen",
    dataCleared: "✅ Lokale Daten erfolgreich gelöscht.",
  },
};

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && LANGS.includes(saved)) return saved;
  } catch {}
  const nav = (navigator.languages?.[0] || navigator.language || "en").slice(0, 2).toLowerCase();
  return (LANGS as string[]).includes(nav) ? (nav as Lang) : "en";
}

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<unknown> };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: APP_FULL_NAME },
      { name: "description", content: APP_DESCRIPTION },
      { property: "og:title", content: APP_FULL_NAME },
      { property: "og:description", content: APP_DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showUninstall, setShowUninstall] = useState(false);
  const [cleared, setCleared] = useState(false);
  const t = T[lang];

  useEffect(() => {
    const l = detectLang();
    setLang(l);
    document.documentElement.lang = l;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister())).catch(() => {});
    }
    if ("caches" in window) {
      caches.keys().then((ks) => ks.forEach((k) => caches.delete(k))).catch(() => {});
    }

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
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

  const chooseLang = (l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
    document.documentElement.lang = l;
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  };

  const handleClearData = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
    if ("caches" in window) caches.keys().then((ks) => ks.forEach((k) => caches.delete(k))).catch(() => {});
    setCleared(true);
    setTimeout(() => setCleared(false), 3000);
  };

  const box: React.CSSProperties = {
    background: BLUE,
    border: `1px solid ${ACCENT}55`,
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    textAlign: "left",
    fontSize: 14,
    lineHeight: 1.5,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: BG,
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 480, width: "100%" }}>
        <img
  src={logoAsset.url}
  alt={APP_FULL_NAME}
  width={140}
  height={140}
  style={{
    display: "block",
    margin: "0 auto 20px",
    width: 140,
    height: 140,
    borderRadius: 28,
  }}
/>
        <div
          style={{
            display: "inline-block",
            background: BLUE,
            border: `2px solid ${ACCENT}`,
            borderRadius: 16,
            padding: "14px 24px",
            fontSize: 40,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          <span style={{ color: ACCENT }}>{APP_CONFIG.wordmark.accent}</span>
          <span style={{ color: "#fff" }}>{APP_CONFIG.wordmark.rest}</span>
        </div>
        <p style={{ marginTop: 16, letterSpacing: 2, fontSize: 13, opacity: 0.85 }}>{t.tagline}</p>

        <a
          href={SAAS_URL}
          style={{
            display: "inline-block",
            marginTop: 24,
            background: ACCENT,
            color: BG,
            fontWeight: 700,
            padding: "14px 28px",
            borderRadius: 12,
            textDecoration: "none",
            fontSize: 16,
          }}
        >
          {t.open}
        </a>
        <p style={{ fontSize: 12, opacity: 0.7, marginTop: 10 }}>{t.license}</p>

        {installed ? (
          <div style={{ ...box, borderColor: "#22c55e", background: "#0f2a1a" }}>{t.installed}</div>
        ) : (
          <div style={box}>
            <div role="group" aria-label={t.language} style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => chooseLang(l)}
                  aria-pressed={lang === l}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 999,
                    border: `1px solid ${lang === l ? ACCENT : "#ffffff40"}`,
                    background: lang === l ? ACCENT : "transparent",
                    color: lang === l ? BG : "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <strong style={{ fontSize: 16 }}>{t.installTitle}</strong>
            <p style={{ margin: "4px 0 12px", opacity: 0.8 }}>{t.installSub}</p>
            {deferred && (
              <button
                onClick={install}
                style={{
                  background: ACCENT,
                  color: BG,
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 18px",
                  fontWeight: 700,
                  cursor: "pointer",
                  marginBottom: 12,
                }}
              >
                {t.installBtn}
              </button>
            )}
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              <li><b>Chrome / Edge:</b> {t.chrome}</li>
              <li><b>Safari Mac:</b> {t.safari}</li>
              <li><b>Android:</b> {t.android}</li>
              <li><b>iPhone / iPad:</b> {t.ios}</li>
            </ul>
            <p style={{ marginTop: 12, opacity: 0.75, fontSize: 13 }}>{t.already}</p>
          </div>
        )}

        <div style={box}>
          <button
            onClick={() => setShowUninstall((v) => !v)}
            aria-expanded={showUninstall}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              padding: 0,
              fontSize: 14,
              textAlign: "left",
              width: "100%",
            }}
          >
            ℹ️ {t.uninstallTitle} {showUninstall ? "▲" : "▼"}
          </button>
          {showUninstall && (
            <div style={{ marginTop: 12 }}>
              <p style={{ opacity: 0.8, marginTop: 0 }}>{t.uninstallSub}</p>
              <ul style={{ paddingLeft: 18 }}>
                <li><b>Windows (Edge / Chrome):</b> {t.uninstallEdge}</li>
                <li><b>Mac:</b> {t.uninstallMac}</li>
                <li><b>Smartphone:</b> {t.uninstallPhone}</li>
              </ul>
              <button
                onClick={handleClearData}
                style={{
                  background: "#7f1d1d",
                  color: "#fff",
                  border: "1px solid #ef4444",
                  borderRadius: 10,
                  padding: "8px 14px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                🗑️ {t.clearDataBtn}
              </button>
              {cleared && <p style={{ color: "#22c55e", marginBottom: 0 }}>{t.dataCleared}</p>}
            </div>
          )}
        </div>

        <p style={{ marginTop: 32, fontSize: 12, opacity: 0.5 }}>© {APP_NAME}</p>
      </div>
    </main>
  );
}
