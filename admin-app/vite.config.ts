import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    VITE_ELECTRIC_URL: JSON.stringify(process.env.VITE_ELECTRIC_URL),
  },
  assetsInclude: [`**/*.wasm`],
})
