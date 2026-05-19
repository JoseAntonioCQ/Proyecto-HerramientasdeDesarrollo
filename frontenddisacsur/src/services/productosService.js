import api from "./api";

export const getProductos = () => api.get("/productos");


export const registrarProducto = (producto) =>
  api.post("/productos", producto);

export const eliminarProducto = (id) =>
  api.delete(`/productos/${id}`);