-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-02-2019 a las 09:40:40
-- Versión del servidor: 10.1.37-MariaDB
-- Versión de PHP: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdshop`
--
-- CREATE DATABASE IF NOT EXISTS `bdshop` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `qadq447`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `padre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`, `padre`) VALUES
(1, 'Dilataciones', 1),
(2, 'Piercings', 2),
(3, 'Túneles', 1),
(4, 'Plugs', 1),
(5, 'Expanders', 1),
(6, 'Bananas', 2),
(7, 'Labrets', 2),
(8, 'Barbells', 2),
(9, 'Circular barbells', 2),
(10, 'Anillos', 2),
(11, 'Nostrils', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `color`
--

CREATE TABLE `color` (
  `idprod` int(11) NOT NULL,
  `color` varchar(15) NOT NULL,
  `imagen` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `color`
--

INSERT INTO `color` (`idprod`, `color`, `imagen`) VALUES
(1, 'azul', 'azul.jpg'),
(1, 'blanco', 'blanco.jpg'),
(1, 'negro', 'negro.jpg'),
(1, 'rojo', 'rojo.jpg'),
(1, 'rosa', 'rosa.jpg'),
(1, 'verde', 'verde.jpg'),
(2, 'amarillo', 'amarillo.jpg'),
(2, 'azul', 'azul.jpg'),
(2, 'blanco', 'blanco.jpg'),
(2, 'negro', 'negro.jpg'),
(2, 'rojo', 'rojo.jpg'),
(3, 'amarillo', 'amarillo.jpg'),
(3, 'azul', 'azul.jpg'),
(3, 'blanco', 'blanco.jpg'),
(3, 'morado', 'morado.jpg'),
(3, 'negro', 'negro.jpg'),
(3, 'verde', 'verde.jpg'),
(4, 'Azul', 'azul.jpg'),
(4, 'Dorado', 'dorado.jpg'),
(4, 'Multicolor', 'multicolor.jpg'),
(4, 'Oro rosa', 'rosa.jpg'),
(5, 'Dorado', 'dorado.jpg'),
(5, 'Multicolor', 'multicolor.jpg'),
(5, 'Negro', 'negro.jpg'),
(6, 'Azul', 'azul.jpg'),
(6, 'Morado', 'morado.jpg'),
(6, 'Nude', 'nude.jpg'),
(6, 'Rosa chicle', 'rosa.jpg'),
(6, 'Verde', 'verde.jpg'),
(7, 'Granate', 'granate.jpg'),
(7, 'Transparente', 'transparente.jpg'),
(7, 'Verde', 'verde.jpg'),
(8, 'Dorado', 'oro.jpg'),
(8, 'Negro', 'negro.jpg'),
(8, 'Oro rosa', 'rosa.jpg'),
(8, 'Plateado', 'plateado.jpg'),
(9, 'Azul', 'azul.jpg'),
(9, 'Granate', 'granate.jpg'),
(9, 'Rojo', 'rojo.jpg'),
(10, 'Dorado', 'oro.jpg'),
(10, 'Negro', 'negro.jpg'),
(10, 'Oro rosa', 'rosa.jpg'),
(10, 'Plateado', 'plateado.jpg'),
(18, 'dorado', 'dorado.jpg'),
(18, 'negro', 'negro.jpg'),
(18, 'oro rosa', 'rosa.jpg'),
(19, 'dorado', 'dorado.jpg'),
(19, 'negro', 'negro.jpg'),
(19, 'plateado', 'plateado.jpg'),
(20, 'dorado', 'dorado.jpg'),
(20, 'negro', 'negro.jpg'),
(20, 'plateado', 'plateado.jpg'),
(21, 'azul', 'azul.jpg'),
(21, 'multicolor', 'multicolor.jpg'),
(21, 'negro', 'negro.jpg'),
(22, 'plateado', 'plateado.jpg'),
(23, 'azul', 'azul.jpg'),
(23, 'blanco', 'blanco.jpg'),
(23, 'fucsia', 'fucsia.jpg'),
(24, 'plateado', 'plateado.jpg'),
(25, 'dorado', 'dorado.jpg'),
(25, 'multicolor', 'multicolor.jpg'),
(25, 'negro', 'negro.jpg'),
(25, 'oro rosa', 'rosa.jpg'),
(26, 'azul', 'azul.jpg'),
(26, 'dorado', 'dorado.jpg'),
(26, 'multicolor', 'multicolor.jpg'),
(26, 'oro rosa', 'rosa.jpg'),
(27, 'morado', 'morado.jpg'),
(27, 'turquesa', 'turquesa.jpg'),
(27, 'verde', 'verde.jpg'),
(28, 'dorado', 'dorado.jpg'),
(28, 'plateado', 'plateado.jpg'),
(29, 'glow-in-the-dar', 'glow.jpg'),
(29, 'negro', 'negro.jpg'),
(29, 'turquesa', 'turquesa.jpg'),
(30, 'Caoba', 'caoba.jpg'),
(31, 'Azul', 'azul.jpg'),
(31, 'Dorado', 'dorado.jpg'),
(31, 'Oro rosa', 'rosa.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineapedido`
--

CREATE TABLE `lineapedido` (
  `id` int(11) NOT NULL,
  `idpedido` int(11) NOT NULL,
  `idprod` int(11) NOT NULL,
  `color` varchar(30) NOT NULL,
  `cant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `lineapedido`
--

INSERT INTO `lineapedido` (`id`, `idpedido`, `idprod`, `color`, `cant`) VALUES
(1, 1, 8, 'Dorado', 1),
(2, 1, 8, 'Plateado', 1),
(3, 1, 9, 'Azul', 1),
(4, 1, 9, 'Granate', 4),
(5, 2, 1, 'negro', 1),
(6, 2, 9, 'Azul', 1),
(7, 3, 8, 'Dorado', 1),
(14, 7, 7, 'Transparente', 1),
(15, 7, 8, 'Oro rosa', 1),
(16, 7, 9, 'Granate', 2),
(17, 8, 6, 'Morado', 1),
(18, 8, 23, 'azul', 1),
(19, 8, 24, 'plateado', 1),
(20, 8, 26, 'oro rosa', 2),
(21, 8, 26, 'multicolor', 1),
(22, 8, 27, 'verde', 1),
(23, 8, 27, 'morado', 1),
(24, 8, 28, 'plateado', 1),
(25, 8, 29, 'glow-in-the-dar', 1),
(26, 9, 22, 'plateado', 1),
(27, 9, 23, 'fucsia', 1),
(28, 9, 27, 'turquesa', 1),
(29, 10, 6, 'Nude', 2),
(30, 10, 26, 'dorado', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id`, `iduser`, `fecha`, `total`) VALUES
(1, 2, '2019-01-20', 25.3),
(2, 2, '2019-01-21', 10.2),
(3, 2, '2019-01-24', 2),
(7, 1, '2019-01-28', 6.4),
(8, 7, '2019-01-31', 40),
(9, 7, '2019-01-31', 18.1),
(10, 7, '2019-02-01', 4.6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `precio` float NOT NULL,
  `carpetaimg` varchar(20) NOT NULL,
  `imagen` varchar(30) NOT NULL,
  `categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`, `carpetaimg`, `imagen`, `categoria`) VALUES
(1, 'Túnel de silicona', 'Túnel acampanado sin rosca de silicona fina en diferentes colores', 1, '1', 'default.jpg', 3),
(2, 'Túnel acrílico', 'Túnel acrílico con rosca en diferentes colores', 1.5, '2', 'default.jpg', 3),
(3, 'Plug', 'Plug acampanado sin rosca de acrílico. Disponible en diferentes colores', 1.4, '3', 'default.jpg', 4),
(4, 'Segment ring', 'Anillo con segmento extraíble de titanio', 3.25, '4', 'dorado.jpg', 10),
(5, 'Anillo con bisagra', 'Anillo con apertura mediante bisagra de titanio', 3.3, '5', 'negro.jpg', 10),
(6, 'Plug de silicona', 'Plug de silicona en colores llamativos', 1.2, '6', 'rosa.jpg', 4),
(7, 'Banana para el ombligo negra', 'Banana de acero quirúrgico con cristal de varios colores', 2.2, '7', 'transparente.jpg', 6),
(8, 'Labret triángulo', 'Labret de titanio con bola en forma triangular (plana)', 1.8, '8', 'negro.jpg', 7),
(9, 'Banana para el ombligo dorada', 'Banana de titanio dorada con cristal en varios colores', 4, '9', 'rojo.jpg', 6),
(10, 'Labret corazón', 'Labret de titanio con bola plana en forma de corazón', 1.6, '10', 'rosa.jpg', 7),
(14, 'Banana con rosa', 'Banana para el ombligo con rosa en la parte inferior disponible en diferentes colores', 2.75, '12', 'cian.jpg', 6),
(16, 'Banana simple', 'Banana simple de titanio en diferentes colores', 1.4, '14', 'multicolor.jpg', 6),
(17, 'Circular barbell con piedra', 'Circular barbell con bolas de piedra en diferentes colores', 4.2, '15', 'negro.jpg', 9),
(18, 'Circular barbell con bola cóni', 'Circular barbell de titanio con bola en forma de cono', 3, '16', 'negro.jpg', 9),
(19, 'Anillo con corazón', 'Anillo con figura de corazón de acero quirúrgico', 3.2, '17', 'dorado.jpg', 10),
(20, 'Barbell flecha', 'Barbell corto con forma de flecha', 2.1, '18', 'negro.jpg', 8),
(21, 'Aro para nostril', 'Aro con tope para nostril', 1.4, '19', 'multicolor.jpg', 10),
(22, 'Set de dilatadores', 'Set de expanders de 1.1 a 15 mm', 9, '20', 'plateado.jpg', 5),
(23, 'Set de dilatadores', 'Set de expanders de colores de 1.1 a 14 mm', 6, '21', 'fucsia.jpg', 5),
(24, 'Barbell con alas', 'Barbell de acero quirúrgico con alas para pezón o industrial', 4.5, '22', 'plateado.jpg', 8),
(25, 'Labret simple', 'Labret de titanio simple en diferentes colores', 2.1, '23', 'multicolor.jpg', 7),
(26, 'Barbell largo', 'Barbell largo sencillo', 2.2, '24', 'azul.jpg', 8),
(27, 'Expander espiral', 'Expander en espiral con manchas disponible en varios colores', 3.1, '25', 'turquesa.jpg', 5),
(28, 'Túnel mandala', 'Túnel acampanado con diseño de mandala alrededor', 3.5, '26', 'dorado.jpg', 3),
(29, 'Set de expanders curvados', 'Set de expanders curvados de 4 a 1.5 mm', 12, '27', 'turquesa.jpg', 5),
(30, 'Plug con corazón', 'Plug de caoba con dibujo de corazón', 3.5, '11', 'caoba.jpg', 4),
(31, 'Túnel de acero', 'Túnel de acero quirúrgico en diferentes colores', 1.7, '13', 'dorado.jpg', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(30) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `ciudad` varchar(20) NOT NULL,
  `cp` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `nombre`, `email`, `password`, `direccion`, `ciudad`, `cp`) VALUES
(1, 'admin', 'Administrador', 'admin@shop.com', 'admin', '*', '*', '0'),
(2, 'user1', 'Ana López', 'analopez@gmail.com', 'user1', 'Calle de la Piruleta, 24, 5ºA', 'Vitoria', '01012'),
(3, 'user2', 'Aitor Fernández', 'aitorfernandez@gmail.com', 'user2', 'C/ Álava, 39', 'Vitoria', '01010'),
(4, 'a', 'a', 'a', 'a', 'a', 'a', '0'),
(5, 'user0', 'Álvaro López', 'alvaro@gmail.com', 'user0', 'C/ Álava, 39', 'Vitoria', '01010'),
(6, 'aaa', 'a', 'a', 'aaa', 'a', 'a', '0'),
(7, 'jsersan', 'José María Serrano', 'jsersan@gmail.com', 'mfmk2556', 'Arrasate', 'Arrasate', '20500');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`idprod`,`color`),
  ADD KEY `idprod` (`idprod`),
  ADD KEY `color` (`color`);

--
-- Indices de la tabla `lineapedido`
--
ALTER TABLE `lineapedido`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `idpedido` (`idpedido`,`idprod`,`color`),
  ADD KEY `idprod` (`idprod`),
  ADD KEY `color` (`color`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `iduser` (`iduser`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `categoria` (`categoria`) USING BTREE;

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`,`username`,`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `lineapedido`
--
ALTER TABLE `lineapedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `color`
--
ALTER TABLE `color`
  ADD CONSTRAINT `color_ibfk_1` FOREIGN KEY (`idprod`) REFERENCES `producto` (`id`);

--
-- Filtros para la tabla `lineapedido`
--
ALTER TABLE `lineapedido`
  ADD CONSTRAINT `lineapedido_ibfk_1` FOREIGN KEY (`idprod`) REFERENCES `producto` (`id`),
  ADD CONSTRAINT `lineapedido_ibfk_2` FOREIGN KEY (`idpedido`) REFERENCES `pedido` (`id`),
  ADD CONSTRAINT `lineapedido_ibfk_3` FOREIGN KEY (`color`) REFERENCES `color` (`color`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
