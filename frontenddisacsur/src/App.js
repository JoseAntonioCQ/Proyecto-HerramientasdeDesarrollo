import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./componentes/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import RegistrarProducto from "./componentes/RegistrarProducto";
import Movimientos from "./pages/Movimientos";
import EliminarProducto from "./pages/EliminarProducto";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ padding: "25px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/registrar" element={<RegistrarProducto />} />
          <Route path="/movimientos" element={<Movimientos />} />
          <Route path="/productos/eliminar" element={<EliminarProducto />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;