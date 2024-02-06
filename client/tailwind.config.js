/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
        // p = primary _ s = secondary _ h = hover
        colors: {
            p: '#6495ed',
            w: '#fff',
            g: '#b6b6b6',
            t: { //Colores para texto
                p: '#b6b6b6',
                s: '#ececec',
                gr: '#00df9a',
            }
        },
    },
},
  plugins: [],
}

