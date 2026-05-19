import { useState } from "react";
import { registrarSalida } from "../services/movimientosService";
import { Modal, Button } from "react-bootstrap";

function ListarProductos({ productos = [] }) {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [voucher, setVoucher] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setCantidad("");
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const agregarAlCarrito = () => {
    if (!cantidad || cantidad <= 0) {
      alert("Ingrese una cantidad válida");
      return;
    }

    const existe = carrito.find(
      (item) => item.id_producto === productoSeleccionado.id_producto
    );

    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id_producto === productoSeleccionado.id_producto
            ? { ...item, cantidad: item.cantidad + Number(cantidad) }
            : item
        )
      );
    } else {
      setCarrito([
        ...carrito,
        {
          ...productoSeleccionado,
          cantidad: Number(cantidad),
        },
      ]);
    }

    cerrarModal();
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id_producto !== id));
  };

  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    try {
      for (let item of carrito) {
        await registrarSalida({
          id_producto: item.id_producto,
          cantidad: item.cantidad,
          usuario_id: 1,
          observacion: "Venta realizada",
        });
      }

      const total = carrito.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
      );

      setVoucher({
        fecha: new Date().toLocaleString(),
        items: carrito,
        total,
      });

      alert("Compra registrada correctamente 🎉");
      setCarrito([]);

    } catch (err) {
      console.error(err);
      alert("Error procesando la compra");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📦 Lista de Productos</h2>

      {/* TABLA DE PRODUCTOS */}
      <table className="table table-bordered table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Unidad</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((p) => (
            <tr key={p.id_producto}>
              <td>{p.id_producto}</td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>{p.unidad_medida}</td>
              <td>{p.stock}</td>
              <td>S/ {p.precio}</td>
              <td>{p.estado}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => abrirModal(p)}
                >
                  Agregar 🛒
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL REACT-BOOTSTRAP */}
      <Modal show={mostrarModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar al Carrito</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {productoSeleccionado && (
            <>
              <p>
                <b>Producto:</b> {productoSeleccionado.nombre}
              </p>

              <label className="form-label">Cantidad:</label>
              <input
                type="number"
                min="1"
                className="form-control"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={agregarAlCarrito}>
            Agregar
          </Button>
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* CARRITO */}
      <h2 className="mt-4">🛍 Carrito</h2>

      {carrito.length === 0 ? (
        <p className="text-muted">Carrito vacío...</p>
      ) : (
        <>
          <table className="table table-striped table-bordered text-center">
            <thead className="table-secondary">
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio Unit.</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {carrito.map((item) => (
                <tr key={item.id_producto}>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td>S/ {item.precio}</td>
                  <td>S/ {item.cantidad * item.precio}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarDelCarrito(item.id_producto)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-primary w-100" onClick={finalizarCompra}>
            ✔ Finalizar Compra
          </button>
        </>
      )}

      {/* VOUCHER */}
      {voucher && (
        <div className="card mt-4 shadow">
          <div className="card-body">
            <h3 className="card-title mb-3">📄 Voucher de Compra</h3>

            <p>
              <b>Fecha:</b> {voucher.fecha}
            </p>

            <h5>Detalle:</h5>
            <ul>
              {voucher.items.map((item) => (
                <li key={item.id_producto}>
                  {item.nombre} – {item.cantidad} x S/ {item.precio} ={" "}
                  <b>S/ {item.cantidad * item.precio}</b>
                </li>
              ))}
            </ul>

            <h4 className="mt-3">
              Total: <span className="text-success">S/ {voucher.total}</span>
            </h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListarProductos;
