/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
        // Lista de colores
        colors: {
            primary: '#064ACB',
            primary_h: '#053ba2',
            gre: '#00df9a',
            gre_h: '#008066',
            eje: { //Ejemplo de una clase dentro de los colores
                p: '#b6b6b6',
            },
        },
        boxShadow: {
          custom: '0 3px 10px rgb(0,0,0,0.2)',
        },
    },
},
  plugins: [],
}

