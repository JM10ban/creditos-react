import { Link } from "react-router-dom";
import "./Navbar.css"; // Opcional (para estilos)

// Navbar principal con enlaces de navegación
export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Navegación principal">
      <h2>CreditSmart</h2>

      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/simulador">Simulador</Link></li>
        <li><Link to="/solicitar">Solicitar Crédito</Link></li>
      </ul>
    </nav>
  );
}

