import ListarProductos from "../componentes/ListarProductos";
import { useEffect, useState } from "react";
import { getProductos } from "../services/productosService";


function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos().then(res => setProductos(res.data));
  }, []);
  return (
    <div>
      <h1>Inventario DISACSUR</h1>
      <ListarProductos productos={productos}/>
    </div>
  );
}

export default Productos;
