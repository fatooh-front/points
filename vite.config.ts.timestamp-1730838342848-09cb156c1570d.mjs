// vite.config.ts
import { defineConfig, loadEnv } from "file:///F:/STUDY/web%20developer/ProjectsJo/LIMS/front/lims-front-v1/lims-front/node_modules/vite/dist/node/index.js";
import react from "file:///F:/STUDY/web%20developer/ProjectsJo/LIMS/front/lims-front-v1/lims-front/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tsconfigPaths from "file:///F:/STUDY/web%20developer/ProjectsJo/LIMS/front/lims-front-v1/lims-front/node_modules/vite-tsconfig-paths/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "F:\\STUDY\\web developer\\ProjectsJo\\LIMS\\front\\lims-front-v1\\lims-front";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tsconfigPaths()],
    optimizeDeps: {
      include: ["react", "react-dom"]
    },
    server: {
      host: "0.0.0.0",
      port: 5001,
      strictPort: true,
      // Prevent Vite from switching ports if 5200 is occupied
      hmr: {
        protocol: "ws",
        // Ensure WebSocket is used for HMR
        port: 5001
        // Make sure HMR uses the correct port
      },
      watch: {
        usePolling: true,
        // Fix reload issues by using polling (useful in Docker/VMs)
        interval: 100
        // Polling interval (in ms)
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    define: {
      "process.env": env
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxTVFVEWVxcXFx3ZWIgZGV2ZWxvcGVyXFxcXFByb2plY3RzSm9cXFxcTElNU1xcXFxmcm9udFxcXFxsaW1zLWZyb250LXYxXFxcXGxpbXMtZnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXFNUVURZXFxcXHdlYiBkZXZlbG9wZXJcXFxcUHJvamVjdHNKb1xcXFxMSU1TXFxcXGZyb250XFxcXGxpbXMtZnJvbnQtdjFcXFxcbGltcy1mcm9udFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovU1RVRFkvd2ViJTIwZGV2ZWxvcGVyL1Byb2plY3RzSm8vTElNUy9mcm9udC9saW1zLWZyb250LXYxL2xpbXMtZnJvbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xyXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgXCJcIik7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBbcmVhY3QoKSwgdHNjb25maWdQYXRocygpXSxcclxuICAgIG9wdGltaXplRGVwczoge1xyXG4gICAgICBpbmNsdWRlOiBbXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiXSxcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaG9zdDogXCIwLjAuMC4wXCIsXHJcbiAgICAgIHBvcnQ6IDUwMDEsXHJcbiAgICAgIHN0cmljdFBvcnQ6IHRydWUsIC8vIFByZXZlbnQgVml0ZSBmcm9tIHN3aXRjaGluZyBwb3J0cyBpZiA1MjAwIGlzIG9jY3VwaWVkXHJcbiAgICAgIGhtcjoge1xyXG4gICAgICAgIHByb3RvY29sOiBcIndzXCIsIC8vIEVuc3VyZSBXZWJTb2NrZXQgaXMgdXNlZCBmb3IgSE1SXHJcbiAgICAgICAgcG9ydDogNTAwMSwgLy8gTWFrZSBzdXJlIEhNUiB1c2VzIHRoZSBjb3JyZWN0IHBvcnRcclxuICAgICAgfSxcclxuICAgICAgd2F0Y2g6IHtcclxuICAgICAgICB1c2VQb2xsaW5nOiB0cnVlLCAvLyBGaXggcmVsb2FkIGlzc3VlcyBieSB1c2luZyBwb2xsaW5nICh1c2VmdWwgaW4gRG9ja2VyL1ZNcylcclxuICAgICAgICBpbnRlcnZhbDogMTAwLCAvLyBQb2xsaW5nIGludGVydmFsIChpbiBtcylcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgIFwicHJvY2Vzcy5lbnZcIjogZW52LFxyXG4gICAgfSxcclxuICB9O1xyXG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQW1aLFNBQVMsY0FBYyxlQUFlO0FBQ3piLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBRTNDLFNBQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDO0FBQUEsSUFDbEMsY0FBYztBQUFBLE1BQ1osU0FBUyxDQUFDLFNBQVMsV0FBVztBQUFBLElBQ2hDO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixZQUFZO0FBQUE7QUFBQSxNQUNaLEtBQUs7QUFBQSxRQUNILFVBQVU7QUFBQTtBQUFBLFFBQ1YsTUFBTTtBQUFBO0FBQUEsTUFDUjtBQUFBLE1BQ0EsT0FBTztBQUFBLFFBQ0wsWUFBWTtBQUFBO0FBQUEsUUFDWixVQUFVO0FBQUE7QUFBQSxNQUNaO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sZUFBZTtBQUFBLElBQ2pCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
