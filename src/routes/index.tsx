import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/smmntnnc-logo.png.asset.json";

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
    uninstallTitle: `How to uninstall or remove ${APP_NAME}`,
    uninstallSub: "You have full control. You can remove the app and its data at any time:",
    uninstallEdge: "In the app window: click \"...\" in the top-right corner → App settings ⚙️ → Uninstall.",
    uninstallMac: "Open Finder → Applications folder → drag the app to Trash.",
    uninstallPhone: "Press and hold the app icon on your home screen → Delete / Uninstall.",
    clearDataBtn: "Clear local data & reset",
    dataCleared: "✅ Local data cleared successfully.",
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
    uninstallTitle: `Come disinstallare o rimuovere ${APP_NAME}`,
    uninstallSub: "Massima trasparenza: puoi rimuovere l'app e liberare spazio in qualsiasi momento:",
    uninstallEdge: "Dalla finestra dell'app: clicca i tre puntini \"...\" in alto a destra ➔ Impostazioni app ⚙️ ➔ Disinstalla.",
    uninstallMac: "Apri il Finder ➔ cartella Applicazioni ➔ trascina l'icona nel Cestino.",
    uninstallPhone: "Tieni premuta l'icona sulla schermata Home ➔ Elimina / Disinstalla.",
    clearDataBtn: "Ripristina e cancella dati locali",
    dataCleared: "✅ Dati locali cancellati con successo.",
  },
  es: {
    tagline: "MANTENIMIENTO INTELIGENTE, LISTO PARA LA OBRA.",
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
    tagline: "INTELLIGENTE WARTUNG, BEREIT FÜR DIE BAUSTELLE.",
    open: `${APP_NAME} öffnen →`,
    license: "Der Zugriff erfordert eine aktive Lizenz. Es wird ein einmaliger E-Mail-Bestätigungscode angefordert.",
    installed: "✅ Anwendung installiert und als App aktiv.",
    installTitle: `${APP_NAME} installieren`,
    installSub: "Füge ein Symbol auf dem Desktop oder Startbildschirm hinzu.",
    installBtn: "App installieren",
    ios: "tippe auf Teilen → Zum Home-Bildschirm",
    chrome: `klicke auf das Installationssymbol in der Adressleiste (Monitor mit ↓ oder "+") oder Menü ⋮ → "${APP_NAME
