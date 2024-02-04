import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/*
            BrowserRouter envuelve la aplicación para habilitar el enrutamiento basado en el navegador.
            Permite que los componentes dentro de la aplicación accedan a la funcionalidad de enrutamiento proporcionada por React Router.
        */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)
