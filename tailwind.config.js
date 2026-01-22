/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1A2847",      // Azul oscuro profundo
                secondary: "#2D3E50",    // Gris charcoal
                accent: "#C5E0D8",       // Menta suave (Brand legacy)
                electric: "#00D4FF",     // Cian eléctrico (New)
                energy: "#FF6B35",       // Naranja energético (CTA)
                light: "#F3F4F7",        // Gris claro comercial (Background)
                darkBg: "#0F1922",       // Fondo muy oscuro
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
            },
            fontSize: {
                '2xl': '24px',
                '7xl': '48px',
                '9xl': '96px',
            },
        },
    },
    plugins: [],
}
