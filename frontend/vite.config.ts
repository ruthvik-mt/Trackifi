// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src")
//     }
//   },
//   server: {
//     port: 3000,
//     proxy: {
//       "/api": {
//         target: "http://localhost:8080",  // ✅ Spring Boot backend
//         changeOrigin: true,
//         secure: false                     // ✅ Disables SSL validation for local dev
//       }
//     }
//   }
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";
// import path from "path";

// export default defineConfig(() => {
//   return {
//     envDir: "./",
//     plugins: [
//       react(),
//       VitePWA({
//         registerType: "autoUpdate",
//         includeAssets: [
//           "favicon.ico",
//           "apple-touch-icon.png",
//           "android-chrome-192x192.png",
//           "android-chrome-512x512.png",
//           "logo-dark.png",
//           "logo-light.png",
//         ],
//         manifest: {
//           name: "Finance Tracker",
//           short_name: "Finance",
//           description: "Track your income and expenses effortlessly.",
//           theme_color: "#ffffff",
//           background_color: "#ffffff",
//           display: "standalone",
//           start_url: "/",
//           icons: [
//             {
//               src: "android-chrome-192x192.png",
//               sizes: "192x192",
//               type: "image/png",
//             },
//             {
//               src: "android-chrome-512x512.png",
//               sizes: "512x512",
//               type: "image/png",
//             },
//             {
//               src: "android-chrome-512x512.png",
//               sizes: "512x512",
//               type: "image/png",
//               purpose: "any maskable",
//             },
//           ],
//         },
//       }),
//     ],
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, "src"),
//       },
//     },
//     build: {
//       outDir: "dist",
//     },
//   };
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig(() => {
  return {
    envDir: "./",
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: [
          "favicon.ico",
          "apple-touch-icon.png",
          "android-chrome-192x192.png",
          "android-chrome-512x512.png",
          "logo-dark.png",
          "logo-light.png",
        ],
        manifest: {
          name: "Finance Tracker",
          short_name: "Finance",
          description: "Track your income and expenses effortlessly.",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          start_url: "/",
          icons: [
            {
              src: "android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
     server: {
      port: 3000, // ✅ Run dev server on port 3000
    },
    build: {
      outDir: "dist",
      chunkSizeWarningLimit: 1000, // Optional: Raise limit to suppress warning
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("react")) return "vendor-react";
              if (id.includes("chart.js")) return "vendor-charts";
              if (id.includes("date-fns")) return "vendor-date";
              return "vendor";
            }
          },
        },
      },
    },
  };
});
