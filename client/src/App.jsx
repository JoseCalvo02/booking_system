import { Routes, Route, Navigate  } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importar Pages
import Home from "./pages/Home/Home"
import NotFound from "./pages/Layout/NotFound";
import Auth from "./pages/Auth/Auth"
//Admin pages
import Admin from "./pages/Roles/Admin/Admin"
import Dashboard from './components/Roles/Admin/Dashboard'
import Citas from "./components/Roles/Admin/Citas"
import Clients from "./components/Roles/Admin/Clients"
//Stylist pages
import Stylist from "./pages/Roles/Stylist/Stylist"
//Client pages
import Client from "./pages/Roles/Client/Client"
import Settings from "./pages/Roles/Client/Settings"
import Reports from "./pages/Roles/Client/Reports"
import Rewards from "./pages/Roles/Client/Rewards"


function App() {
    return (
        <>
            <Routes>
                {/* Define las rutas y los componentes asociados. Por ejemplo, cuando la URL es "/", se renderiza el componente Home. */}
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<Admin />} >
                    {/* Anida rutas para que el componente Admin pueda renderizar las rutas hijas. */}
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="citas" element={<Citas />} />
                    <Route path="clientes" element={<Clients />} />
                    {/*
                    <Route path="catalogo" element={<Catalogo />} />
                    <Route path="estilistas" element={<Estilistas />} />
                    <Route path="horarios" element={<Horarios />} />
                    <Route path="canjes" element={<Canjes />} />
                    <Route path="reportes" element={<Reportes />} />
                    <Route path="perfil" element={<Perfil />} />
                    <Route path="*" element={<NotFound />} />*/}
                </Route>
                <Route path="/stylist" element={<Stylist />} />
                <Route path="/client" element={<Client />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/reports" element={<Reports/>} />
                <Route path="/rewards" element={<Rewards />} />
                {/* La ruta comodín "*" maneja todas las URL que no coinciden con las rutas anteriores. */}
                <Route path="*" element={<Navigate to="/notFound" replace />} />
                    {/* La ruta NotFound */}
                <Route path="/notFound" element={<NotFound />} />
            </Routes>

            {/* Agrega el ToastContainer aquí para que esté disponible en toda la aplicación. */}
            <ToastContainer />
        </>
    )
}

export default App
