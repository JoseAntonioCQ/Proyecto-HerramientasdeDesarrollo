import { useState, useEffect } from "react";
import { registrarSalida } from "../services/movimientosService";
import { getProductos } from "../services/productosService";

function MovimientoSalida() {
  const [datos, setDatos] = useState({
    id_producto: "",
    cantidad: "",
    usuario_id: 1,
    observacion: "",
  });

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const res = await getProductos();
    setProductos(res.data);
  };

  const validar = () => {
    if (!datos.id_producto) return "Debe seleccionar un producto.";
    if (!datos.cantidad || Number(datos.cantidad) <= 0)
      return "La cantidad debe ser mayor a 0.";
    return null;
  };

  const enviar = async () => {
    const msg = validar();
    if (msg) {
      setError(msg);
      return;
    }

    try {
      await registrarSalida({
        id_producto: Number(datos.id_producto),
        cantidad: Number(datos.cantidad),
        usuario_id: datos.usuario_id,
        observacion: datos.observacion,
      });

      alert("Salida registrada ✔️");

      cargarProductos();
      setError("");

      setDatos({
        id_producto: "",
        cantidad: "",
        usuario_id: 1,
        observacion: "",
      });

    } catch (error) {
      console.error(error);
      alert("Error registrando la salida");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">📤 Registrar Salida</h2>

      <div className="card shadow p-4">
        <h4 className="mb-3">Datos de la salida</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* SELECT PRODUCTO */}
        <div className="mb-3">
          <label className="form-label">Producto</label>
          <select
            className="form-select"
            value={datos.id_producto}
            onChange={(e) =>
              setDatos({ ...datos, id_producto: e.target.value })
            }
          >
            <option value="">Seleccione un producto</option>
            {productos.map((p) => (
              <option key={p.id_producto} value={p.id_producto}>
                {p.nombre} — Stock: {p.stock}
              </option>
            ))}
          </select>
        </div>

        {/* CANTIDAD */}
        <div className="mb-3">
          <label className="form-label">Cantidad</label>
          <input
            type="number"
            className="form-control"
            value={datos.cantidad}
            onChange={(e) =>
              setDatos({ ...datos, cantidad: e.target.value })
            }
          />
        </div>

        {/* OBSERVACIÓN */}
        <div className="mb-3">
          <label className="form-label">Observación</label>
          <input
            type="text"
            className="form-control"
            value={datos.observacion}
            onChange={(e) =>
              setDatos({ ...datos, observacion: e.target.value })
            }
          />
        </div>

        {/* BOTÓN */}
        <button className="btn btn-primary w-100" onClick={enviar}>
          Registrar Salida
        </button>
      </div>

      {/* LISTA DE PRODUCTOS ACTUALIZADOS */}
      <h3 className="mt-5 mb-3">📦 Productos Actualizados</h3>

      <table className="table table-striped table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Stock Actual</th>
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

export default MovimientoSalida;
