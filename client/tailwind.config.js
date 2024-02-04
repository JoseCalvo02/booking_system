/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
        // p = primary _ s = secondary _ h = hover
        colors: {
            p: '#6495ed',
            w: '#fff', //white
            g: '#b6b6b6', //grey
            text: {
                p: '#b6b6b6',
                s: '#ececec',
            }
        },
    },
},
  plugins: [],
}

