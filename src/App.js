import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Simulador from "./pages/Simulador";
import SolicitarCredito from "./pages/SolicitarCredito";

export default function App() {
  return (
    <Router>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/simulador" element={<Simulador />} />
          <Route path="/solicitar" element={<SolicitarCredito />} />
        </Routes>
      </div>
    </Router>
  );
}
// Componente principal que organiza las rutas de la app
