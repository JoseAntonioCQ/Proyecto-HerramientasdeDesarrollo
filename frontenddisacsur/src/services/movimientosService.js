import  api  from "./api";


// REGISTRAR ENTRADA
export const registrarEntrada = (data) =>
  api.post("/movimientos/entrada", data);

// REGISTRAR SALIDA
export const registrarSalida = (data) =>
  api.post("/movimientos/salida", data);



// OBTENER MOVIMIENTOS DE PRODUCTO
export const movimientosPorProducto = (id_producto) =>
  api.get(`/movimientos/producto/${id_producto}`);
