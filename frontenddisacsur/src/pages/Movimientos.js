import MovimientosEntrada from "../componentes/MovimientosEntrada";
import MovimientoSalida from "../componentes/MovimientoSalida";

function Movimientos() {
  return (
    <div>
      <h1>Movimientos de Inventario</h1>
      
      <MovimientosEntrada />
      <hr />
      <MovimientoSalida />
    </div>
  );
}

export default Movimientos;
