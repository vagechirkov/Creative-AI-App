/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./stories/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        fontFamily: {
            plex: ['"IBM Plex Mono"', 'monospace'],
            inter: ['Inter', 'sans-serif'],
            jura: ['Jura', 'sans-serif'],
        }
    },
    plugins: [],
};
