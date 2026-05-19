import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={navStyle}>
      <Link style={linkStyle} to="/">🏠 Inicio</Link>
      <Link style={linkStyle} to="/productos">📦 Productos</Link>
      <Link style={linkStyle} to="/movimientos/entrada">⬆️ Entrada</Link>
      <Link style={linkStyle} to="/movimientos/salida">⬇️ Salida</Link>
      <Link style={linkStyle} to="/productos/eliminar">🗑️ Eliminar</Link>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  gap: "20px",
  padding: "15px",
  background: "#222",
  color: "white",
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontWeight: "bold",
};

export default Navbar;
