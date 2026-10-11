// ============================================================
// UNICO PUNTO DI CONFIGURAZIONE DEL LANCIATORE PWA
// Per clonare il template su un nuovo SaaS cambia SOLO questo file
// (+ le immagini in public/icons/ e il logo in src/assets/).
// Il nome del brand non si traduce mai in nessuna lingua.
// ============================================================

export const APP_CONFIG = {
  name: "006SmMntnnc",
  subtitle: "Smart Maintenance",
  saasUrl: "https://006smmntnnc.corporateboostservice.eu",

  // Wordmark centrale: prima parte in colore accent, seconda in bianco
  wordmark: { accent: "006Sm", rest: "Mntnnc" },

  colors: {
    bg: "#06090f",
    theme: "#0a2a4a",
    accent: "#b4ff3c",
  },

  tagline: {
    en: "SMART MAINTENANCE, READY FOR SITE.",
    it: "MANUTENZIONE INTELLIGENTE, PRONTA PER IL CANTIERE.",
    es: "MANTENIMIENTO INTELIGENTE, LISTO PARA LA OBRA.",
    de: "INTELLIGENTE WARTUNG, BEREIT FÜR DIE BAUSTELLE.",
  },
} as const;

export const APP_FULL_NAME = `${APP_CONFIG.name} – ${APP_CONFIG.subtitle}`;
export const APP_DESCRIPTION = `${APP_CONFIG.tagline.en} · ${APP_CONFIG.tagline.it}`;
