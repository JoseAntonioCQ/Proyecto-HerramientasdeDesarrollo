import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./componentes/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import MovimientosEntrada from "./componentes/MovimientosEntrada";
import MovimientoSalida from "./componentes/MovimientoSalida";
import EliminarProducto from "./pages/EliminarProducto";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ padding: "25px" }}>
        <Routes>
          {/* Página de inicio */}
          <Route path="/" element={<Home />} />

          {/* Listar productos */}
          <Route path="/productos" element={<Productos />} />

          {/* Registrar entrada */}
          <Route path="/movimientos/entrada" element={<MovimientosEntrada />} />

          {/* Registrar salida */}
          <Route path="/movimientos/salida" element={<MovimientoSalida />} />

          {/* Eliminar producto */}
          <Route path="/productos/eliminar" element={<EliminarProducto />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
