import { useState } from "react";
import MovimientosEntrada from "../componentes/MovimientosEntrada";
import MovimientoSalida from "../componentes/MovimientoSalida";

function Movimientos() {
  const [tab, setTab] = useState("entrada");

  return (
    <div className="container mt-4">
      <h1>Movimientos de Inventario</h1>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "entrada" ? "active" : ""}`}
            onClick={() => setTab("entrada")}
          >
            ⬆️ Entrada
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "salida" ? "active" : ""}`}
            onClick={() => setTab("salida")}
          >
            ⬇️ Salida
          </button>
        </li>
      </ul>

      {tab === "entrada" ? <MovimientosEntrada /> : <MovimientoSalida />}
    </div>
  );
}

export default Movimientos;