/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#003D5C",      // Azul corporativo profundo
                secondary: "#2C3E50",    // Gris azulado profesional
                accent: "#0088B4",       // Azul cian refinado
                cta: "#D85E2C",          // Naranja corporativo
                light: "#F5F7FA",        // Gris muy claro
                dark: "#1F2937",         // Gris oscuro para texto
                darkBg: "#1F2937",       // Fondo oscuro
                border: "#E5E7EB",       // Gris para bordes
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
            },
            // Removed AI-style glow shadows
        },
    },
    plugins: [],
}
