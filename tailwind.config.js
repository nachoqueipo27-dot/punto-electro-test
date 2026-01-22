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
                warmGray: {
                    50: '#FAF9F8',
                    100: '#F8F7F5',
                    150: '#F5F3F1',
                    200: '#F0EEEB',
                },
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
