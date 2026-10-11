import { createFileRoute } from "@tanstack/react-router";
import { APP_CONFIG, APP_FULL_NAME, APP_DESCRIPTION } from "@/config/app";

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

export const Route = createFileRoute("/manifest.json")({
  server: {
    handlers: {
      GET: async () =>
        new Response(
          JSON.stringify({
            name: APP_FULL_NAME,
            short_name: APP_CONFIG.name,
            description: APP_DESCRIPTION,
            start_url: "/",
            scope: "/",
            display: "standalone",
            orientation: "portrait",
            lang: "it",
            background_color: APP_CONFIG.colors.bg,
            theme_color: APP_CONFIG.colors.theme,
            icons: sizes.map((s) => ({
              src: `/icons/icon-${s}x${s}.png`,
              sizes: `${s}x${s}`,
              type: "image/png",
              purpose: s === 192 || s === 512 ? "any maskable" : "any",
            })),
          }),
          { headers: { "content-type": "application/manifest+json; charset=utf-8" } },
        ),
    },
  },
});
