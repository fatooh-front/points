// vite.config.ts
import { defineConfig, loadEnv } from "file:///F:/STUDY/web%20developer/ProjectsJo/LIMS%20user%20Managment/DEV-LIMS-Portal-UserManagement-Front/node_modules/vite/dist/node/index.js";
import react from "file:///F:/STUDY/web%20developer/ProjectsJo/LIMS%20user%20Managment/DEV-LIMS-Portal-UserManagement-Front/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tsconfigPaths from "file:///F:/STUDY/web%20developer/ProjectsJo/LIMS%20user%20Managment/DEV-LIMS-Portal-UserManagement-Front/node_modules/vite-tsconfig-paths/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "F:\\STUDY\\web developer\\ProjectsJo\\LIMS user Managment\\DEV-LIMS-Portal-UserManagement-Front";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tsconfigPaths()],
    optimizeDeps: {
      include: ["react", "react-dom"]
    },
    server: {
      host: "0.0.0.0",
      port: 5007,
      strictPort: true,
      // Prevent Vite from switching ports if 5200 is occupied
      hmr: {
        protocol: "ws",
        // Ensure WebSocket is used for HMR
        port: 5007
        // Make sure HMR uses the correct port
      },
      watch: {
        usePolling: true,
        // Fix reload issues by using polling (useful in Docker/VMs)
        interval: 100
        // Polling interval (in ms)
      }
      // cors: true, // Enable CORS
    },
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    define: {
      "process.env": env
    },
    build: {
      // sourcemap: true,
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxTVFVEWVxcXFx3ZWIgZGV2ZWxvcGVyXFxcXFByb2plY3RzSm9cXFxcTElNUyB1c2VyIE1hbmFnbWVudFxcXFxERVYtTElNUy1Qb3J0YWwtVXNlck1hbmFnZW1lbnQtRnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXFNUVURZXFxcXHdlYiBkZXZlbG9wZXJcXFxcUHJvamVjdHNKb1xcXFxMSU1TIHVzZXIgTWFuYWdtZW50XFxcXERFVi1MSU1TLVBvcnRhbC1Vc2VyTWFuYWdlbWVudC1Gcm9udFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovU1RVRFkvd2ViJTIwZGV2ZWxvcGVyL1Byb2plY3RzSm8vTElNUyUyMHVzZXIlMjBNYW5hZ21lbnQvREVWLUxJTVMtUG9ydGFsLVVzZXJNYW5hZ2VtZW50LUZyb250L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksIFwiXCIpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2luczogW3JlYWN0KCksIHRzY29uZmlnUGF0aHMoKV0sXHJcbiAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgaW5jbHVkZTogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxyXG4gICAgICBwb3J0OiA1MDA3LFxyXG4gICAgICBzdHJpY3RQb3J0OiB0cnVlLCAvLyBQcmV2ZW50IFZpdGUgZnJvbSBzd2l0Y2hpbmcgcG9ydHMgaWYgNTIwMCBpcyBvY2N1cGllZFxyXG4gICAgICBobXI6IHtcclxuICAgICAgICBwcm90b2NvbDogXCJ3c1wiLCAvLyBFbnN1cmUgV2ViU29ja2V0IGlzIHVzZWQgZm9yIEhNUlxyXG4gICAgICAgIHBvcnQ6IDUwMDcsIC8vIE1ha2Ugc3VyZSBITVIgdXNlcyB0aGUgY29ycmVjdCBwb3J0XHJcbiAgICAgIH0sXHJcbiAgICAgIHdhdGNoOiB7XHJcbiAgICAgICAgdXNlUG9sbGluZzogdHJ1ZSwgLy8gRml4IHJlbG9hZCBpc3N1ZXMgYnkgdXNpbmcgcG9sbGluZyAodXNlZnVsIGluIERvY2tlci9WTXMpXHJcbiAgICAgICAgaW50ZXJ2YWw6IDEwMCwgLy8gUG9sbGluZyBpbnRlcnZhbCAoaW4gbXMpXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIGNvcnM6IHRydWUsIC8vIEVuYWJsZSBDT1JTXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICBcInByb2Nlc3MuZW52XCI6IGVudixcclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICAvLyBzb3VyY2VtYXA6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgfTtcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa2QsU0FBUyxjQUFjLGVBQWU7QUFDeGYsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sVUFBVTtBQUhqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFFM0MsU0FBTztBQUFBLElBQ0wsU0FBUyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFBQSxJQUNsQyxjQUFjO0FBQUEsTUFDWixTQUFTLENBQUMsU0FBUyxXQUFXO0FBQUEsSUFDaEM7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFlBQVk7QUFBQTtBQUFBLE1BQ1osS0FBSztBQUFBLFFBQ0gsVUFBVTtBQUFBO0FBQUEsUUFDVixNQUFNO0FBQUE7QUFBQSxNQUNSO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTCxZQUFZO0FBQUE7QUFBQSxRQUNaLFVBQVU7QUFBQTtBQUFBLE1BQ1o7QUFBQTtBQUFBLElBRUY7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUN0QztBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLGVBQWU7QUFBQSxJQUNqQjtBQUFBLElBQ0EsT0FBTztBQUFBO0FBQUEsSUFFUDtBQUFBLEVBRUY7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
