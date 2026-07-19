# Proyecto Herramientas de Desarrollo — Sistema de Inventario DISACSUR

Sistema web de gestión de inventario para DISACSUR, compuesto por una API REST (backend) y una aplicación de una sola página (frontend) que permite administrar productos y controlar sus movimientos de stock (entradas y salidas) de forma sencilla.

## 📋 Descripción del proyecto

La aplicación permite:

- **Listar productos** registrados en el inventario, junto con su stock actual.
- **Registrar nuevos productos**, indicando nombre, descripción, categoría, unidad de medida, stock inicial, stock mínimo, precio y fecha de vencimiento (si aplica).
- **Eliminar productos** del inventario.
- **Registrar movimientos de entrada** (ingreso de mercadería), que incrementan el stock del producto correspondiente.
- **Registrar movimientos de salida** (ventas o egresos), que descuentan el stock del producto correspondiente.
- **Consultar el historial de movimientos** de un producto específico, ordenado por fecha.

El proyecto está dividido en dos partes independientes que se comunican entre sí mediante peticiones HTTP:

- **`ServerDisacsur/`** — API REST construida con Node.js, Express y MySQL.
- **`frontenddisacsur/`** — Interfaz de usuario construida con React y React Bootstrap.

## 🛠️ Tecnologías utilizadas

### Backend (`ServerDisacsur`)
- **Node.js**
- **Express 5** — framework para construir la API REST.
- **MySQL2** — driver para conectar y consultar la base de datos MySQL.
- **CORS** — middleware para permitir peticiones desde el frontend.

### Frontend (`frontenddisacsur`)
- **React 19**
- **React Router DOM 7** — enrutamiento de páginas (Inicio, Productos, Registrar, Movimientos, Eliminar).
- **React Bootstrap 2 / Bootstrap 5** — componentes y estilos de interfaz.
- **Axios** — cliente HTTP para consumir la API del backend.
- **React Scripts (Create React App)** — configuración y scripts de desarrollo/build.
- **Testing Library (Jest DOM, React, User Event)** — utilidades para pruebas.

### Base de datos
- **MySQL** — almacena las tablas `productos` y `movimientos_inventario`.

## 📂 Estructura del proyecto

```
Proyecto-HerramientasdeDesarrollo/
├── ServerDisacsur/          # Backend (API REST)
│   ├── server.js            # Punto de entrada del servidor Express
│   └── package.json
└── frontenddisacsur/        # Frontend (React)
    ├── public/
    └── src/
        ├── componentes/     # Componentes reutilizables (Navbar, formularios, listados)
        ├── pages/           # Páginas de la app (Home, Productos, Movimientos, Eliminar)
        ├── services/        # Llamadas a la API (api.js, productosService.js, movimientosService.js)
        └── App.js           # Configuración de rutas
```

## ✅ Requisitos previos

Antes de instalar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada) y npm.
- [MySQL](https://dev.mysql.com/downloads/) (servidor local o remoto).
- [Git](https://git-scm.com/) para clonar el repositorio.

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/JoseAntonioCQ/Proyecto-HerramientasdeDesarrollo.git
cd Proyecto-HerramientasdeDesarrollo
```

### 2. Configurar la base de datos

Crea una base de datos en MySQL llamada `disacsur` (o el nombre que prefieras) con, al menos, las siguientes tablas:

```sql
CREATE DATABASE disacsur;
USE disacsur;

CREATE TABLE productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  descripcion VARCHAR(255),
  categoria VARCHAR(100),
  unidad_medida VARCHAR(50),
  stock INT DEFAULT 0,
  stock_minimo INT DEFAULT 0,
  precio DECIMAL(10,2) DEFAULT 0,
  fecha_vencimiento DATE
);

CREATE TABLE movimientos_inventario (
  id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
  id_producto INT NOT NULL,
  tipo ENUM('entrada','salida') NOT NULL,
  cantidad INT NOT NULL,
  usuario_id INT,
  observacion VARCHAR(255),
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);
```

> ⚠️ Ajusta el diseño de las tablas según tus necesidades reales; esta es la estructura mínima que espera el backend.

### 3. Instalar y ejecutar el backend

```bash
cd ServerDisacsur
npm install
```

Abre `server.js` y verifica/edita los datos de conexión a tu base de datos MySQL:

```js
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: "3306",
  database: "disacsur",
});
```

Luego inicia el servidor:

```bash
node server.js
```

El servidor quedará disponible en `http://localhost:4000`.

### 4. Instalar y ejecutar el frontend

En otra terminal:

```bash
cd frontenddisacsur
npm install
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:3000` y consumirá la API en `http://localhost:4000` (configurado en `src/services/api.js`).

## 🔌 Endpoints principales de la API

| Método | Endpoint                          | Descripción                                   |
|--------|------------------------------------|------------------------------------------------|
| GET    | `/productos`                       | Lista todos los productos                      |
| POST   | `/productos`                       | Registra un nuevo producto                      |
| DELETE | `/productos/:id`                   | Elimina un producto por su ID                   |
| POST   | `/movimientos/entrada`             | Registra una entrada y aumenta el stock         |
| POST   | `/movimientos/salida`              | Registra una salida y descuenta el stock        |
| GET    | `/movimientos/:id`                 | Obtiene un movimiento por su ID                 |
| GET    | `/movimientos/producto/:id`        | Lista el historial de movimientos de un producto|

## 🖥️ Uso de la aplicación

Una vez levantados backend y frontend, desde el menú de navegación puedes acceder a:

- **🏠 Inicio** — pantalla de bienvenida.
- **📦 Productos** — listado de productos con su stock.
- **➕ Registrar** — formulario para dar de alta un nuevo producto.
- **🔄 Movimientos** — registro de entradas/salidas y consulta de historial.
- **🗑️ Eliminar** — eliminación de productos existentes.

## 👤 Autor

Proyecto desarrollado por **José Antonio CQ** como parte de la asignatura de Herramientas de Desarrollo.
