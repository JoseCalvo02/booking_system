/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
        // Lista de colores
        colors: {
            primary: '#366ED8',
            primary_h: '#064ACB',
            bg_black: '#23232e',
            gre: '#00df9a',
            gre_hover: '#008066',
            w: '#fff',
            g: '#b6b6b6',
            eje: { //Ejemplo de una clase dentro de los colores
                p: '#b6b6b6',
            }
        },
    },
},
  plugins: [],
}

