import { useState } from "react";
import { registrarProducto } from "../services/productosService";

function RegistrarProducto() {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    unidad_medida: "unidad",
    stock: 0,
    stock_minimo: 0,
    precio: "",
    fecha_vencimiento: ""
  });

  const [error, setError] = useState("");

  const validar = () => {
    if (!producto.nombre.trim()) return "El nombre es obligatorio.";
    if (!producto.descripcion.trim()) return "La descripción es obligatoria.";
    if (!producto.categoria.trim()) return "La categoría es obligatoria.";
    if (!producto.precio || Number(producto.precio) <= 0)
      return "El precio debe ser mayor a 0.";
    return null;
  };

  const enviar = async () => {
    const mensajeError = validar();
    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    try {
      await registrarProducto({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        categoria: producto.categoria,
        unidad_medida: producto.unidad_medida,
        stock: producto.stock,
        stock_minimo: producto.stock_minimo,
        precio: producto.precio,
        fecha_vencimiento: producto.fecha_vencimiento || null
      });

      alert("Producto registrado correctamente 🎉");

      setProducto({
        nombre: "",
        descripcion: "",
        categoria: "",
        unidad_medida: "unidad",
        stock: 0,
        stock_minimo: 0,
        precio: "",
        fecha_vencimiento: ""
      });
      setError("");

    } catch (err) {
      console.error(err);
      setError("Error en el servidor al registrar el producto.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">

          <h3 className="mb-3 text-center">Registrar Producto</h3>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="row g-3">

            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input
                className="form-control"
                value={producto.nombre}
                onChange={(e) =>
                  setProducto({ ...producto, nombre: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Categoría</label>
              <input
                className="form-control"
                value={producto.categoria}
                onChange={(e) =>
                  setProducto({ ...producto, categoria: e.target.value })
                }
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                value={producto.descripcion}
                onChange={(e) =>
                  setProducto({ ...producto, descripcion: e.target.value })
                }
              ></textarea>
            </div>

            <div className="col-md-4">
              <label className="form-label">Unidad de medida</label>
              <select
                className="form-select"
                value={producto.unidad_medida}
                onChange={(e) =>
                  setProducto({ ...producto, unidad_medida: e.target.value })
                }
              >
                <option value="unidad">Unidad</option>
                <option value="kilo">Kilo</option>
                <option value="litro">Litro</option>
                <option value="metro">Metro</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Stock inicial</label>
              <input
                type="number"
                className="form-control"
                value={producto.stock}
                onChange={(e) =>
                  setProducto({ ...producto, stock: Number(e.target.value) })
                }
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Stock mínimo</label>
              <input
                type="number"
                className="form-control"
                value={producto.stock_minimo}
                onChange={(e) =>
                  setProducto({
                    ...producto,
                    stock_minimo: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                value={producto.precio}
                onChange={(e) =>
                  setProducto({ ...producto, precio: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Fecha de vencimiento</label>
              <input
                type="date"
                className="form-control"
                value={producto.fecha_vencimiento}
                onChange={(e) =>
                  setProducto({
                    ...producto,
                    fecha_vencimiento: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-12 mt-3">
              <button className="btn btn-primary w-100" onClick={enviar}>
                Registrar Producto
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrarProducto;
