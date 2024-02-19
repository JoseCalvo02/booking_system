import { Routes, Route } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importar Pages
import Home from "./pages/Home/Home"
import NotFound from "./pages/Layout/NotFound";
import Auth from "./pages/Auth/Auth"

function App() {
    return (
        <>
            <Routes>
                {/*
                    Define las rutas y los componentes asociados. Por ejemplo, cuando la URL es "/", se renderiza el componente Home.
                */}
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                {/*
                    La ruta comodín "*" maneja todas las URL que no coinciden con las rutas anteriores.
                */}
                <Route path="*" element={<NotFound/>} />
            </Routes>
            {/* Agrega el ToastContainer aquí para que esté disponible en toda la aplicación. */}
            <ToastContainer />
        </>
    )
}

export default App
