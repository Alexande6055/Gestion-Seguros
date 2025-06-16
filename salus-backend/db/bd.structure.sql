-- Eliminación de tablas por orden de relaciones
DROP TABLE IF EXISTS requisito_seguro;
DROP TABLE IF EXISTS seguro_requisito;
DROP TABLE IF EXISTS seguro_beneficio;
DROP TABLE IF EXISTS pago_seguro;
DROP TABLE IF EXISTS beneficiario;
DROP TABLE IF EXISTS usuario_seguro;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS seguro;
DROP TABLE IF EXISTS beneficio;
DROP TABLE IF EXISTS requisito;

-- Tabla usuario
CREATE TABLE usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  correo VARCHAR(100),
  username VARCHAR(50),
  password VARCHAR(100),
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  tipo TINYINT,
  activo TINYINT,
  cedula VARCHAR(10),
  telefono VARCHAR(10),
  PRIMARY KEY (id_usuario),
  UNIQUE KEY correo (correo),
  UNIQUE KEY username (username),
  UNIQUE KEY cedula (cedula)
);

-- Tabla seguro
CREATE TABLE seguro (
  id_seguro INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  precio DECIMAL(10,2),
  tiempo_pago VARCHAR(50),
  descripcion TEXT,
  tipo VARCHAR(50),
  estado TINYINT(1) DEFAULT 1,
  cobertura DECIMAL(10,2),
  num_beneficiarios INT,
  PRIMARY KEY (id_seguro)
);

-- Tabla usuario_seguro
CREATE TABLE usuario_seguro (
  id_usuario_seguro INT NOT NULL AUTO_INCREMENT,
  id_usuario_per INT,
  id_seguro_per INT,
  fecha_contrato DATE,
  fecha_fin DATE,
  estado INT,
  estado_pago INT,
  PRIMARY KEY (id_usuario_seguro),
  KEY (id_usuario_per),
  KEY (id_seguro_per),
  CONSTRAINT usuario_seguro_ibfk_1 FOREIGN KEY (id_usuario_per) REFERENCES usuario (id_usuario),
  CONSTRAINT usuario_seguro_ibfk_2 FOREIGN KEY (id_seguro_per) REFERENCES seguro (id_seguro)
);

-- Tabla beneficiario
CREATE TABLE beneficiario (
  id_beneficiario INT NOT NULL AUTO_INCREMENT,
  id_usuario_seguro INT,
  nombre VARCHAR(100) NOT NULL,
  cedula VARCHAR(10),
  parentesco VARCHAR(50),
  fecha_nacimiento DATE,
  PRIMARY KEY (id_beneficiario),
  KEY (id_usuario_seguro),
  CONSTRAINT beneficiario_ibfk_1 FOREIGN KEY (id_usuario_seguro) REFERENCES usuario_seguro (id_usuario_seguro)
);

-- Tabla pago_seguro
CREATE TABLE pago_seguro (
  id_pago_seguro INT NOT NULL AUTO_INCREMENT,
  id_usuario_seguro_per INT,
  fecha_pago DATE,
  cantidad DOUBLE,
  comprobante_pago VARCHAR(255),
  PRIMARY KEY (id_pago_seguro),
  KEY (id_usuario_seguro_per),
  CONSTRAINT pago_seguro_ibfk_1 FOREIGN KEY (id_usuario_seguro_per) REFERENCES usuario_seguro (id_usuario_seguro)
);
ALTER TABLE pago_seguro
MODIFY COLUMN comprobante_pago LONGBLOB;
-- Tabla beneficio
CREATE TABLE beneficio (
  id_beneficio INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  detalle TEXT,
  PRIMARY KEY (id_beneficio),
  UNIQUE KEY (nombre)
);

-- Tabla requisito
CREATE TABLE requisito (
  id_requisito INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  detalle TEXT,
  PRIMARY KEY (id_requisito),
  UNIQUE KEY (nombre)
);

-- Tabla requisito_seguro
CREATE TABLE requisito_seguro (
  id_requisito_seguro INT NOT NULL AUTO_INCREMENT,
  id_usuario_seguro_per INT,
  id_requisito_per INT,
  informacion TEXT,
  validado TINYINT,
  PRIMARY KEY (id_requisito_seguro),
  KEY (id_usuario_seguro_per),
  KEY (id_requisito_per),
  CONSTRAINT requisito_seguro_ibfk_1 FOREIGN KEY (id_usuario_seguro_per) REFERENCES usuario_seguro (id_usuario_seguro),
  CONSTRAINT requisito_seguro_ibfk_2 FOREIGN KEY (id_requisito_per) REFERENCES requisito (id_requisito)
);

-- Tabla seguro_beneficio
CREATE TABLE seguro_beneficio (
  id_seguro_beneficio INT NOT NULL AUTO_INCREMENT,
  id_seguro_per INT,
  id_beneficio_per INT,
  PRIMARY KEY (id_seguro_beneficio),
  KEY (id_seguro_per),
  KEY (id_beneficio_per),
  CONSTRAINT seguro_beneficio_ibfk_1 FOREIGN KEY (id_seguro_per) REFERENCES seguro (id_seguro),
  CONSTRAINT seguro_beneficio_ibfk_2 FOREIGN KEY (id_beneficio_per) REFERENCES beneficio (id_beneficio)
);

-- Tabla seguro_requisito
CREATE TABLE seguro_requisito (
  id_seguro_requisito INT NOT NULL AUTO_INCREMENT,
  id_seguro_per INT,
  id_requisito_per INT,
  PRIMARY KEY (id_seguro_requisito),
  KEY (id_seguro_per),
  KEY (id_requisito_per),
  CONSTRAINT seguro_requisito_ibfk_1 FOREIGN KEY (id_seguro_per) REFERENCES seguro (id_seguro),
  CONSTRAINT seguro_requisito_ibfk_2 FOREIGN KEY (id_requisito_per) REFERENCES requisito (id_requisito)
);

-- Tabla usuario
INSERT INTO usuario (correo, username, password, nombre, apellido, tipo, activo, cedula, telefono) VALUES
('juan@example.com', 'juan123', 'pass123', 'Juan', 'Pérez', 1, 1, '0102030405', '0999999999'),
('ana@example.com', 'ana456', 'pass456', 'Ana', 'López', 2, 1, '0102030406', '0988888888');

-- Tabla seguro
INSERT INTO seguro (nombre, precio, tiempo_pago, descripcion, tipo, estado, cobertura, num_beneficiarios) VALUES
('Seguro Vida Básico', 25.50, 'Mensual', 'Cobertura básica por fallecimiento', 'Vida', 1, 5000.00, 3),
('Seguro Salud Familiar', 40.00, 'Mensual', 'Incluye atención médica básica y emergencias', 'Salud', 1, 10000.00, 5);

-- Tabla usuario_seguro
INSERT INTO usuario_seguro (id_usuario_per, id_seguro_per, fecha_contrato, fecha_fin, estado, estado_pago) VALUES
(1, 1, '2024-01-01', '2025-01-01', 1, 1),
(2, 2, '2024-03-15', '2025-03-15', 1, 0);

-- Tabla beneficiario
INSERT INTO beneficiario (id_usuario_seguro, nombre, cedula, parentesco, fecha_nacimiento) VALUES
(1, 'Carlos Pérez', '0101010101', 'Hijo', '2010-05-12'),
(1, 'María Pérez', '0101010102', 'Esposa', '1985-11-23'),
(2, 'Luis López', '0101010103', 'Padre', '1960-08-09');

-- Tabla pago_seguro
INSERT INTO pago_seguro (id_usuario_seguro_per, fecha_pago, cantidad, comprobante_pago) VALUES
(1, '2024-01-05', 25.50, 'comp-001.jpg'),
(1, '2024-02-05', 25.50, 'comp-002.jpg'),
(2, '2024-03-20', 40.00, 'comp-003.jpg');

-- Tabla beneficio
INSERT INTO beneficio (nombre, detalle) VALUES
('Cobertura por accidente', 'Indemnización por accidentes graves'),
('Asistencia médica', 'Consulta médica general y emergencia'),
('Gastos funerarios', 'Cubre hasta $1000 en gastos funerarios');

-- Tabla requisito
INSERT INTO requisito (nombre, detalle) VALUES
('Copia de cédula', 'Escaneo o foto de la cédula de identidad'),
('Formulario firmado', 'Formulario de inscripción firmado por el usuario'),
('Prueba de domicilio', 'Factura o documento que verifique dirección del usuario');

-- Tabla requisito_seguro
INSERT INTO requisito_seguro (id_usuario_seguro_per, id_requisito_per, informacion, validado) VALUES
(1, 1, 'cedula_juan.pdf', 1),
(1, 2, 'formulario_juan.pdf', 1),
(2, 1, 'cedula_ana.pdf', 1);

-- Tabla seguro_beneficio
INSERT INTO seguro_beneficio (id_seguro_per, id_beneficio_per) VALUES
(1, 1),
(1, 3),
(2, 1),
(2, 2);

-- Tabla seguro_requisito
INSERT INTO seguro_requisito (id_seguro_per, id_requisito_per) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(2, 3);

