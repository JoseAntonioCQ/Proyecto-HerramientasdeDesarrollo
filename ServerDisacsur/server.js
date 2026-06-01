const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
// 🔹 Crear la app
const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Conexión a la base de datos
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port:"3306",
  database: "disacsur", // ⚠️ cámbialo por el nombre real
});

// 🔹 Verificar conexión
conexion.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a MySQL:", err);
  } else {
    console.log("✅ Conectado a MySQL correctamente");
  }
});

// Listar productos
app.get('/productos', (req, res) => {
  conexion.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).send( err);
    res.json(results);
    });
});

//Registrar venta
// Registrar salida (venta)
app.post("/movimientos/salida", (req, res) => {
  const { id_producto, cantidad, usuario_id, observacion } = req.body;
  console.log("📥 Datos recibidos:", { id_producto, cantidad, usuario_id, observacion });

  // 1. Registrar el movimiento
  const movimientoSQL = `
    INSERT INTO movimientos_inventario 
    (id_producto, tipo, cantidad, usuario_id, observacion) 
    VALUES (?, 'salida', ?, ?, ?)
  `;

  conexion.query(
    movimientoSQL,
    [id_producto, cantidad, usuario_id, observacion],
    (err, result) => {
      if (err) return res.status(500).send(err);

      // 2. Actualizar stock
      const updateSQL = `
        UPDATE productos 
        SET stock = stock - ? 
        WHERE id_producto = ?
      `;

      conexion.query(updateSQL, [cantidad, id_producto], (err2, result2) => {
        if (err2) return res.status(500).send(err2);
        console.log("🔧 Stock actualizado, filas afectadas:", result2.affectedRows)
        res.json({ mensaje: "Salida registrada y stock actualizado 👍" });
      });
    }
  );
});

//Consulta Movimientos
app.get("/movimientos/:id", (req, res) => {
  const id = req.params.id;

  conexion.query(
    "SELECT * FROM movimientos_inventario WHERE id_movimiento = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results[0]);
    }
  );
});

//Consulta Movimientos por codigos
app.get("/movimientos/producto/:id", (req, res) => {
  const id = req.params.id;

  const sql = `
    SELECT m.*, p.nombre 
    FROM movimientos_inventario m
    JOIN productos p ON m.id_producto = p.id_producto
    WHERE m.id_producto = ?
    ORDER BY fecha DESC
  `;

  conexion.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});
 
//Ingreso Entrada
app.post("/movimientos/entrada", (req, res) => {
  const { id_producto, cantidad, usuario_id, observacion } = req.body;

  const movimientoSQL = `
    INSERT INTO movimientos_inventario 
    (id_producto, tipo, cantidad, usuario_id, observacion) 
    VALUES (?, 'entrada', ?, ?, ?)
  `;

  conexion.query(
    movimientoSQL,
    [id_producto, cantidad, usuario_id, observacion],
    (err, result) => {
      if (err) return res.status(500).send(err);

      const updateSQL = `
        UPDATE productos 
        SET stock = stock + ? 
        WHERE id_producto = ?
      `;

      conexion.query(updateSQL, [cantidad, id_producto], (err2) => {
        if (err2) return res.status(500).send(err2);

        res.json({ mensaje: "Entrada registrada y stock actualizado 🤝" });
      });
    }
  );
});
// Registrar un NUEVO producto
app.post("/productos", (req, res) => {
  const {
    nombre,
    descripcion,
    categoria,
    unidad_medida,
    stock,
    stock_minimo,
    precio,
    fecha_vencimiento
  } = req.body;

  const sql = `
    INSERT INTO productos 
    (nombre, descripcion, categoria, unidad_medida, stock, stock_minimo, precio, fecha_vencimiento)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  conexion.query(
    sql,
    [
      nombre,
      descripcion,
      categoria,
      unidad_medida,
      stock || 0,
      stock_minimo || 0,
      precio || 0,
      fecha_vencimiento || null
    ],
    (err, result) => {
      if (err) return res.status(500).send(err);

      res.json({
        mensaje: "Producto registrado correctamente",
        id_producto: result.insertId
      });
    }
  );
});
// ELIMINAR PRODUCTO
app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM productos WHERE id_producto = ?";

  conexion.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto eliminado correctamente" });
  });
});


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
