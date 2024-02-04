import { Routes, Route } from "react-router-dom";

// Importar Pages
import Home from "./pages/Home/Home"
import NotFound from "./pages/Layout/NotFound";
import Login from "./pages/Auth/Login"
import Signup from "./pages/Auth/Signup"

function App() {
    return (
        <>
            <Routes>
                {/*
                    Define las rutas y los componentes asociados. Por ejemplo, cuando la URL es "/", se renderiza el componente Home.
                */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/*
                    La ruta comodín "*" maneja todas las URL que no coinciden con las rutas anteriores.
                */}
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </>
    )
}

export default App
