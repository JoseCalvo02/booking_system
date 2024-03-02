import { Routes, Route } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importar Pages
import Home from "./pages/Home/Home"
import NotFound from "./pages/Layout/NotFound";
import Auth from "./pages/Auth/Auth"
import Admin from "./pages/Roles/Admin/Admin"
import Stylist from "./pages/Roles/Stylist/Stylist"
import Client from "./pages/Roles/Client/Client"
import Services from "./pages/Roles/Client/Services"

function App() {
    return (
        <>
            <Routes>
                {/* Define las rutas y los componentes asociados. Por ejemplo, cuando la URL es "/", se renderiza el componente Home. */}
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/stylist" element={<Stylist />} />
                <Route path="/client" element={<Client />} />
                <Route path= "/services" element={<Services />} />
                {/* La ruta comodín "*" maneja todas las URL que no coinciden con las rutas anteriores. */}
                <Route path="*" element={<NotFound/>} />
            </Routes>
            {/* Agrega el ToastContainer aquí para que esté disponible en toda la aplicación. */}
            <ToastContainer />
        </>
    )
}

export default App
