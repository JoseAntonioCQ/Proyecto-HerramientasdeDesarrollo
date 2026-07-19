-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: disacsur
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `movimientos_inventario`
--

DROP TABLE IF EXISTS `movimientos_inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimientos_inventario` (
  `id_movimiento` int NOT NULL AUTO_INCREMENT,
  `id_producto` int DEFAULT NULL,
  `tipo` enum('entrada','salida') DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `usuario_id` int DEFAULT NULL,
  `observacion` text,
  PRIMARY KEY (`id_movimiento`),
  KEY `id_producto` (`id_producto`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `movimientos_inventario_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  CONSTRAINT `movimientos_inventario_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimientos_inventario`
--

LOCK TABLES `movimientos_inventario` WRITE;
/*!40000 ALTER TABLE `movimientos_inventario` DISABLE KEYS */;
INSERT INTO `movimientos_inventario` VALUES (15,1,'salida',20,'2025-12-10 13:10:01',1,'Venta realizada'),(16,1,'salida',20,'2025-12-10 13:10:25',1,'Venta realizada'),(17,1,'salida',5,'2025-12-10 13:25:33',1,'Venta realizada'),(18,2,'salida',10,'2025-12-10 13:25:50',1,'Venta realizada'),(19,1,'salida',5,'2025-12-10 13:26:55',1,'Venta realizada'),(20,1,'salida',5,'2025-12-10 13:36:55',1,'Venta realizada'),(21,2,'salida',10,'2025-12-10 13:37:10',1,'Venta realizada'),(22,2,'salida',10,'2025-12-10 13:37:44',1,'Venta realizada'),(23,3,'salida',5,'2025-12-10 14:12:45',1,'Venta realizada'),(24,2,'salida',5,'2025-12-10 14:13:23',1,'Venta realizada'),(25,2,'salida',5,'2025-12-10 14:33:45',1,'Venta realizada'),(26,2,'salida',5,'2025-12-10 15:00:23',1,'Venta realizada'),(27,2,'salida',5,'2025-12-10 15:30:22',1,'Venta realizada'),(28,3,'salida',5,'2025-12-10 15:32:45',1,'Venta realizada'),(29,10,'salida',50,'2025-12-10 18:33:36',1,'Venta realizada'),(31,1,'entrada',20,'2025-12-10 18:59:16',1,'Martillo Carpintero con mago de Acero'),(32,2,'salida',20,'2025-12-10 19:02:38',1,'Venta realizada'),(33,1,'entrada',20,'2025-12-10 19:03:18',1,'Martillo Carpintero con mango de Acero'),(34,3,'salida',10,'2025-12-10 19:07:01',1,'Venta realizada'),(35,2,'entrada',20,'2025-12-10 19:07:29',1,''),(37,1,'salida',1,'2025-12-10 19:38:53',1,'Venta realizada'),(38,4,'salida',1,'2025-12-10 19:38:53',1,'Venta realizada'),(39,1,'salida',1,'2025-12-10 20:40:53',1,'Venta realizada'),(40,2,'salida',2,'2025-12-10 20:40:53',1,'Venta realizada'),(41,1,'entrada',10,'2025-12-10 22:26:22',1,''),(42,1,'entrada',7,'2025-12-10 22:32:42',1,''),(43,1,'salida',10,'2025-12-10 22:41:45',1,''),(44,1,'salida',10,'2025-12-10 23:04:18',1,'Venta realizada'),(45,4,'salida',9,'2025-12-10 23:04:18',1,'Venta realizada'),(46,1,'entrada',5,'2025-12-10 23:39:12',1,''),(47,14,'salida',20,'2025-12-10 23:41:48',1,'Venta realizada'),(48,1,'entrada',10,'2025-12-10 23:42:31',1,''),(49,6,'salida',70,'2025-12-10 23:43:00',1,''),(50,1,'salida',20,'2025-12-10 23:43:17',1,''),(51,4,'salida',10,'2025-12-10 23:44:14',1,'Venta realizada'),(52,1,'salida',10,'2025-12-10 23:46:37',1,'Venta realizada'),(53,1,'salida',5,'2026-05-19 22:48:50',1,''),(54,2,'salida',2,'2026-05-19 22:49:08',1,''),(55,2,'salida',4,'2026-05-19 22:53:46',1,''),(56,1,'entrada',20,'2026-05-19 22:54:06',1,''),(57,1,'salida',5,'2026-05-19 23:00:11',1,''),(58,1,'entrada',25,'2026-05-19 23:00:35',1,''),(59,9,'salida',6,'2026-05-19 23:02:29',1,'Venta realizada');
/*!40000 ALTER TABLE `movimientos_inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `categoria` varchar(50) DEFAULT NULL,
  `unidad_medida` enum('unidad','kilo','litro','metro') DEFAULT NULL,
  `stock` int DEFAULT '0',
  `stock_minimo` int DEFAULT '0',
  `precio` decimal(10,2) DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Martillo Carpintero','Martillo de acero con mango de madera','Herramientas','unidad',50,10,25.00,'2030-01-01','Activo'),(2,'Destornillador Plano','Destornillador punta plana 6\"','Herramientas','unidad',22,15,8.50,'2030-01-01','Activo'),(3,'Destornillador Estrella','Destornillador punta cruz 6\"','Herramientas','unidad',55,15,9.00,'2030-01-01','Activo'),(4,'Taladro Eléctrico','Taladro eléctrico 600W con velocidad variable','Eléctricos','unidad',0,5,320.00,'2030-01-01','Activo'),(5,'Caja de Clavos','Clavos de acero 2” (500 unidades)','Fijaciones','unidad',100,20,15.00,'2030-01-01','Activo'),(6,'Caja de Tornillos','Tornillos autorroscantes 1” (500 unidades)','Fijaciones','unidad',20,20,18.00,'2030-01-01','Activo'),(7,'Llave Inglesa','Llave ajustable 12” de acero','Herramientas','unidad',40,8,45.00,'2030-01-01','Activo'),(8,'Cinta Métrica','Cinta métrica retráctil 5m','Medición','unidad',60,10,12.00,'2030-01-01','Activo'),(9,'Pintura Acrílica Blanca','Galón de pintura acrílica blanca interior','Pinturas','litro',24,5,65.00,'2027-12-01','Activo'),(10,'Lija Grano Fino','Lija para madera y metal grano 220','Abrasivos','unidad',150,30,2.50,'2030-01-01','Activo'),(14,'Tornillo','Tornillo 5 pulgadas','Materiales','kilo',180,1,20.00,'2026-09-10',NULL);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` enum('admin','almacen','ventas') DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Jose Antonio','jose','12345','admin');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-19 10:34:15
