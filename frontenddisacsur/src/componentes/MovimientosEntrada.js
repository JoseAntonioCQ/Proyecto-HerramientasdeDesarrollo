import { useState, useEffect } from "react";
import { registrarEntrada } from "../services/movimientosService";
import { getProductos, registrarProducto } from "../services/productosService";

function MovimientosEntrada() {
  const [productos, setProductos] = useState([]);
  const [mostrarNuevoProducto, setMostrarNuevoProducto] = useState(false);

  const [datos, setDatos] = useState({
    id_producto: "",
    cantidad: "",
    observacion: "",
    usuario_id: 1
  });

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    unidad_medida: "unidad",
    stock: 0,
    stock_minimo: 1,
    precio: "",
    fecha_vencimiento: ""
  });

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    getProductos().then(res => setProductos(res.data));
  };

  const enviar = async () => {
    if (!datos.id_producto || !datos.cantidad) {
      alert("Complete los campos requeridos.");
      return;
    }

    try {
      await registrarEntrada({
        id_producto: Number(datos.id_producto),
        cantidad: Number(datos.cantidad),
        usuario_id: datos.usuario_id,
        observacion: datos.observacion
      });

      alert("Entrada registrada correctamente");
      setDatos({ id_producto: "", cantidad: "", observacion: "", usuario_id: 1 });

    } catch (error) {
      console.error(error);
      alert("Error registrando entrada");
    }
  };

  const registrarNuevoProducto = async () => {
    const { nombre, precio, descripcion } = nuevoProducto;

    if (!nombre || !precio || !descripcion) {
      alert("Los campos Nombre, Descripción y Precio son obligatorios.");
      return;
    }

    try {
      const res = await registrarProducto(nuevoProducto);
      
      // Primero recargamos y esperamos
      await cargarProductos();

      // Ahora sí seteamos el id recién creado
      setDatos(prev => ({
        ...prev,
        id_producto: res.data.id_producto
      }));

      alert("Producto registrado correctamente");
      setMostrarNuevoProducto(false);

      setNuevoProducto({
        nombre: "",
        descripcion: "",
        categoria: "",
        unidad_medida: "unidad",
        stock: 0,
        stock_minimo: 1,
        precio: "",
        fecha_vencimiento: ""
      });

    } catch (error) {
      console.error(error);
      alert("Error creando producto");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4 text-primary">Registrar Entrada</h2>

      {/* SELECT PRODUCTOS */}
      <div className="mb-3">
        <label className="form-label">Producto</label>
        <select
          className="form-select"
          value={datos.id_producto}
          onChange={(e) => setDatos({ ...datos, id_producto: e.target.value })}
        >
          <option value="">Seleccione un producto</option>
          {productos.map((p) => (
            <option key={p.id_producto} value={p.id_producto}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

     

      {/* CAMPOS */}
      <div className="mb-3">
        <label className="form-label">Cantidad</label>
        <input
          type="number"
          className="form-control"
          placeholder="Cantidad"
          value={datos.cantidad}
          onChange={(e) => setDatos({ ...datos, cantidad: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Observación</label>
        <input
          className="form-control"
          placeholder="Observación"
          value={datos.observacion}
          onChange={(e) => setDatos({ ...datos, observacion: e.target.value })}
        />
      </div>

      {/* BOTONES */}
<div className="mb-3">
  <button className="btn btn-success w-100 mb-2" onClick={enviar}>
    Registrar Entrada ✔
  </button>

  <button
    className="btn btn-outline-primary w-100"
    onClick={() => setMostrarNuevoProducto(true)}
  >
    ➕ Agregar producto nuevo
  </button>
</div>


      {/* MODAL Bootstrap */}
      {mostrarNuevoProducto && (
       <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Registrar Producto Nuevo</h5>
                <button
                  className="btn-close"
                  onClick={() => setMostrarNuevoProducto(false)}
                ></button>
              </div>

              <div className="modal-body">

                <div className="mb-2">
                  <label className="form-label">Nombre</label>
                  <input
                    className="form-control"
                    value={nuevoProducto.nombre}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                    }
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Descripción</label>
                  <input
                    className="form-control"
                    value={nuevoProducto.descripcion}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })
                    }
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Categoría</label>
                  <input
                    className="form-control"
                    value={nuevoProducto.categoria}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })
                    }
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Unidad de medida</label>
                  <select
                    className="form-select"
                    value={nuevoProducto.unidad_medida}
                    onChange={(e) =>
                      setNuevoProducto({
                        ...nuevoProducto,
                        unidad_medida: e.target.value
                      })
                    }
                  >
                    <option value="unidad">Unidad</option>
                    <option value="kilo">Kilo</option>
                    <option value="litro">Litro</option>
                    <option value="metro">Metro</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label className="form-label">Stock Inicial</label>
                  <input
                    type="number"
                    className="form-control"
                    value={nuevoProducto.stock}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, stock: e.target.value })
                    }
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    value={nuevoProducto.precio}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
                    }
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Fecha de vencimiento</label>
                  <input
                    type="date"
                    className="form-control"
                    value={nuevoProducto.fecha_vencimiento}
                    onChange={(e) =>
                      setNuevoProducto({
                        ...nuevoProducto,
                        fecha_vencimiento: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-primary" onClick={registrarNuevoProducto}>
                  Guardar Producto
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => setMostrarNuevoProducto(false)}
                >
                  Cancelar
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovimientosEntrada;
