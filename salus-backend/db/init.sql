-- Tabla: usuario
DROP TABLE IF EXISTS usuario CASCADE;
CREATE TABLE usuario (
  id_usuario SERIAL PRIMARY KEY,
  correo VARCHAR(100) UNIQUE,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(100),
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  tipo SMALLINT,
  activo SMALLINT,
  cedula VARCHAR(10) UNIQUE,
  telefono VARCHAR(10)
);

INSERT INTO usuario VALUES
  (9,'teoauz@gmail.com','MateoAuz','$2b$10$lO2QhhVNf43Vs2rD0n59TOgJlUXgt7ln7C7nrlvwEOfd7ZRab5kje','Mateo','Auz',0,1,'1234567890','0987654321'),
  (10,'mauricioGuevara@gmail.com','MauricioGuevara','$2b$10$PBzPfwtO1QqZCuHA42YGIujARqnges6xWzpKzE/h0vtn6NynmGb4e','Maurico','Guevara',1,0,'1808647634','0987714718'),
  (11,'santiagoMora@gmail.com','SantioMora','$2b$10$iUHf.z9aEdBLv3bGQzgoLOmNPzfg7WwBCoOMDMoGlZfaq3PcSuFXe','Santiago','Mora',1,1,'1808123634','0983507919'),
  (12,'holasboring@gmail.com','BorisRex','$2b$10$V/Vf0kHo62ZQpKQbHGFRkevr0TcZiyy2jvsVkQ0FUaRtsvk71FUKK','Boris','Vinces',2,1,'1808647693','0982414718');

-- Tabla: seguro
DROP TABLE IF EXISTS seguro CASCADE;
CREATE TABLE seguro (
  id_seguro SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  precio NUMERIC(10,2),
  tiempo_pago VARCHAR(50),
  descripcion TEXT,
  tipo VARCHAR(50),
  estado BOOLEAN DEFAULT TRUE,
  cobertura NUMERIC(10,2),
  num_beneficiarios INTEGER
);

INSERT INTO seguro VALUES 
  (1,'Oro',250.00,'Mensual','Seguro de prueba','Salud',TRUE,10000.00,2);

-- Tabla: beneficio
DROP TABLE IF EXISTS beneficio CASCADE;
CREATE TABLE beneficio (
  id_beneficio SERIAL PRIMARY KEY,
  nombre VARCHAR(100) UNIQUE,
  detalle TEXT
);

INSERT INTO beneficio VALUES 
  (6, 'Revisión dental', '-');

-- Tabla: requisito
DROP TABLE IF EXISTS requisito CASCADE;
CREATE TABLE requisito (
  id_requisito SERIAL PRIMARY KEY,
  nombre VARCHAR(100) UNIQUE,
  detalle TEXT
);

INSERT INTO requisito VALUES 
  (3, 'Cédula de identidad', '-');

-- Tabla: usuario_seguro
DROP TABLE IF EXISTS usuario_seguro CASCADE;
CREATE TABLE usuario_seguro (
  id_usuario_seguro SERIAL PRIMARY KEY,
  id_usuario_per INTEGER REFERENCES usuario(id_usuario),
  id_seguro_per INTEGER REFERENCES seguro(id_seguro),
  fecha_contrato DATE,
  fecha_fin DATE,
  estado INTEGER,
  estado_pago INTEGER
);

-- Tabla: beneficiario
DROP TABLE IF EXISTS beneficiario CASCADE;
CREATE TABLE beneficiario (
  id_beneficiario SERIAL PRIMARY KEY,
  id_usuario_seguro INTEGER REFERENCES usuario_seguro(id_usuario_seguro),
  nombre VARCHAR(100) NOT NULL,
  cedula VARCHAR(10),
  parentesco VARCHAR(50),
  fecha_nacimiento DATE
);

-- Tabla: pago_seguro
DROP TABLE IF EXISTS pago_seguro CASCADE;
CREATE TABLE pago_seguro (
  id_pago_seguro SERIAL PRIMARY KEY,
  id_usuario_seguro_per INTEGER REFERENCES usuario_seguro(id_usuario_seguro),
  fecha_pago DATE,
  cantidad DOUBLE PRECISION,
  comprobante_pago VARCHAR(255)
);

-- Tabla: requisito_seguro
DROP TABLE IF EXISTS requisito_seguro CASCADE;
CREATE TABLE requisito_seguro (
  id_requisito_seguro SERIAL PRIMARY KEY,
  id_usuario_seguro_per INTEGER REFERENCES usuario_seguro(id_usuario_seguro),
  id_requisito_per INTEGER REFERENCES requisito(id_requisito),
  informacion TEXT,
  validado SMALLINT
);

-- Tabla: seguro_beneficio
DROP TABLE IF EXISTS seguro_beneficio CASCADE;
CREATE TABLE seguro_beneficio (
  id_seguro_beneficio SERIAL PRIMARY KEY,
  id_seguro_per INTEGER REFERENCES seguro(id_seguro),
  id_beneficio_per INTEGER REFERENCES beneficio(id_beneficio)
);

INSERT INTO seguro_beneficio VALUES (1, 1, 6);

-- Tabla: seguro_requisito
DROP TABLE IF EXISTS seguro_requisito CASCADE;
CREATE TABLE seguro_requisito (
  id_seguro_requisito SERIAL PRIMARY KEY,
  id_seguro_per INTEGER REFERENCES seguro(id_seguro),
  id_requisito_per INTEGER REFERENCES requisito(id_requisito)
);

INSERT INTO seguro_requisito VALUES (1, 1, 3);
