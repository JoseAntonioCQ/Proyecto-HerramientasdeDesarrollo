import { useEffect, useState } from "react";
import { getProductos, eliminarProducto } from "../services/productosService";

function EliminarProducto() {
  const [productos, setProductos] = useState([]);
  const [idEliminar, setIdEliminar] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await getProductos();
      setProductos(res.data);
    } catch (err) {
      console.error(err);
      alert("Error cargando productos");
    }
  };

  const eliminar = async () => {
    if (!idEliminar) {
      alert("Seleccione un producto para eliminar");
      return;
    }

    const confirmar = window.confirm(
      "⚠ ¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer."
    );

    if (!confirmar) return;

    try {
      await eliminarProducto(idEliminar);
      alert("Producto eliminado correctamente");
      cargarProductos();
      setIdEliminar("");
    } catch (err) {
      console.error(err);
      alert("Error eliminando producto");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🗑 Eliminar Producto</h2>

      <div className="card p-3 shadow">
        <label className="form-label">Selecciona un producto</label>
        <select
          className="form-select"
          value={idEliminar}
          onChange={(e) => setIdEliminar(e.target.value)}
        >
          <option value="">-- Seleccionar --</option>

          {productos.map((p) => (
            <option key={p.id_producto} value={p.id_producto}>
              {p.nombre} (Stock: {p.stock})
            </option>
          ))}
        </select>

        <button className="btn btn-danger mt-3" onClick={eliminar}>
          Eliminar Producto
        </button>
      </div>

      <h3 className="mt-4">📦 Productos Registrados</h3>

      <table className="table table-bordered text-center mt-2">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((p) => (
            <tr key={p.id_producto}>
              <td>{p.id_producto}</td>
              <td>{p.nombre}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EliminarProducto;
