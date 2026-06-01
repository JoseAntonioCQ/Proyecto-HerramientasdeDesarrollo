import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "🏠 Inicio" },
    { to: "/productos", label: "📦 Productos" },
    { to: "/productos/registrar", label: "➕ Registrar" },
    { to: "/movimientos", label: "🔄 Movimientos" },
    { to: "/productos/eliminar", label: "🗑️ Eliminar" },
  ];

  return (
    <nav style={navStyle}>
      <div style={brandStyle}>⚙️ DISACSUR</div>
      <div style={linksStyle}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              ...linkStyle,
              ...(location.pathname === link.to ? activeLinkStyle : {}),
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 30px",
  background: "#1a1a1a",
  borderBottom: "3px solid #e67e00",
  boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
};

const brandStyle = {
  color: "#e67e00",
  fontSize: "22px",
  fontWeight: "bold",
  letterSpacing: "2px",
};

const linksStyle = {
  display: "flex",
  gap: "8px",
};

const linkStyle = {
  textDecoration: "none",
  color: "#cccccc",
  fontWeight: "500",
  padding: "8px 14px",
  borderRadius: "6px",
  transition: "background 0.2s",
};

const activeLinkStyle = {
  color: "#e67e00",
  background: "#2e2e2e",
  borderBottom: "2px solid #e67e00",
};

export default Navbar;