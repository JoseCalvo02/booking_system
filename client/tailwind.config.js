/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
        // Lista de colores
        colors: {
            primary: '#6495ed',
            primary_h: '#3E64CC',
            nav_bg: '#23232e',
            w: '#fff',
            g: '#b6b6b6',
            t: { //Colores para texto
                p: '#b6b6b6',
                s: '#ececec',
                gr: '#00df9a',
                gr_hover: '#008066',
            }
        },
    },
},
  plugins: [],
}

