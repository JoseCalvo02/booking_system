import { Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from '../utils/tokenUtils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importar Pages
import Home from "./pages/Home/Home"
import NotFound from "./pages/Layout/NotFound";
import Auth from "./pages/Auth/Auth"
//Admin pages
import Admin from "./pages/Roles/Admin/Admin"
import Dashboard from './components/Admin/Dashboard'
import Citas from "./components/Admin/Citas"
import Clients from "./components/Admin/Clients"
import Services from "./components/Admin/Services"
import Stylists from "./components/Admin/Stylists"
import Schedules from "./components/Admin/Schedules"
import Redemptions from "./components/Admin/Redemptions"
import ReportsAdmin from "./components/Admin/Reports"
import Profile from "./components/Admin/Profile"
//Stylist pages
import Stylist from "./pages/Roles/Stylist/Stylist"
//Client pages
import Client from "./pages/Roles/Client/Client"
import ClientHome from "./pages/Roles/Client/Home"
import Settings from "./pages/Roles/Client/Settings"
import Reports from "./pages/Roles/Client/Reports"
import Rewards from "./pages/Roles/Client/Rewards"
import CitasCliente from "./pages/Roles/Client/CitasCliente"

function App() {
    return (
        <>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/notFound" element={<NotFound />} />
                { /* Rutas protegidas */}
                <Route path="/admin" element={isAuthenticated() && getUserRole() === 'Administrador' ? <Admin /> : <Navigate to="/auth" replace />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="citas" element={<Citas />} />
                    <Route path="clientes" element={<Clients />} />
                    <Route path="services" element={<Services />} />
                    <Route path="estilistas" element={<Stylists />} />
                    <Route path="schedules" element={<Schedules />} />
                    <Route path="canjes" element={<Redemptions />} />
                    <Route path="reports" element={<ReportsAdmin />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/stylist" element={isAuthenticated() && getUserRole() === 'Estilista' || getUserRole() === 'Administrador' ? <Stylist /> : <Navigate to="/auth" replace />} />
                <Route path="/client" element={isAuthenticated() && getUserRole() === 'Cliente' || getUserRole() === 'Administrador' ? <Client /> : <Navigate to="/auth" replace />} >
                    <Route index element={<ClientHome />} />
                    <Route path="home" element={<ClientHome />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="reports" element={<Reports/>} />
                    <Route path="rewards" element={<Rewards />} />
                    <Route path="citasCliente" element={<CitasCliente/>} />
                </Route>
                {/* La ruta comodín "*" maneja todas las URL que no coinciden con las rutas anteriores. */}
                <Route path="*" element={<Navigate to="/notFound" replace />} />
            </Routes>

            {/* Agrega el ToastContainer aquí para que esté disponible en toda la aplicación. */}
            <ToastContainer />
        </>
    )
}

export default App
