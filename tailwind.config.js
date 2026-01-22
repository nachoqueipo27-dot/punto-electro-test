/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#36558F", // azul profundo
                secondary: "#FFFFFF", // blanco
                accent: "#C5E0D8", // menta suave
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
            },
            fontSize: {
                '2xl': '24px', // Body
                '7xl': '48px', // H2
                '9xl': '96px', // H1
            },
        },
    },
    plugins: [],
}
