import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tsconfigPaths()],
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
    server: {
      host: "0.0.0.0",
      port: 5007,
      strictPort: true, // Prevent Vite from switching ports if 5200 is occupied
      hmr: {
        protocol: "ws", // Ensure WebSocket is used for HMR
        port: 5007, // Make sure HMR uses the correct port
      },
      watch: {
        usePolling: true, // Fix reload issues by using polling (useful in Docker/VMs)
        interval: 100, // Polling interval (in ms)
      },
      // cors: true, // Enable CORS
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Expose only the needed env variables, e.g., VITE_BASE_URL
      "import.meta.env.VITE_API_ROOT": JSON.stringify(
        env.VITE_API_ROOT ?? process.env.VITE_API_ROOT
      ),
      "import.meta.env.VITE_API_ROOT_LIMS": JSON.stringify(
        env.VITE_API_ROOT_LIMS ?? process.env.VITE_API_ROOT_LIMS
      ),
      "import.meta.env.VITE_API_ROOT_INVENTORY": JSON.stringify(
        env.VITE_API_ROOT_INVENTORY ?? process.env.VITE_API_ROOT_INVENTORY
      ),
      "import.meta.env.VITE_SOCKET": JSON.stringify(
        env.VITE_SOCKET ?? process.env.VITE_SOCKET
      ),
    },
    build: {
      // sourcemap: true,
    },
  };
});
