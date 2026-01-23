import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // ⭐ CONFIGURACIÓN CRÍTICA PARA IMÁGENES HD
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp'],

  build: {
    // Aumentar el límite de assets en línea (para evitar compresión)
    assetsInlineLimit: 0, // No incrustrar imágenes en bundle

    // Desabilitar minificación de imágenes estáticas
    minify: 'terser',

    // Permitir assets grandes
    rollupOptions: {
      output: {
        // Mantener estructura de archivos
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.includes('.png') || assetInfo.name.includes('.jpg') || assetInfo.name.includes('.webp')) {
            return 'assets/[name][extname]'; // Sin hash para cacheability
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },

  // Optimización de servidor de desarrollo
  server: {
    fs: {
      strict: false // Permitir acceso a files fuera de root
    }
  }
})
