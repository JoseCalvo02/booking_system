-- ------------------------------------- Proyecto FabiStudioNails -------------------------------------
-- Este es el esquema de base de datos para el proyecto FabiStudioNails, creado por Mario Cordero y José Calvo el 18/02/2024.
-- El proyecto está diseñado para gestionar la agenda y los servicios de un estudio de uñas y belleza.

-- ------------------------------------- Table Roles ----------------------------------
-- La tabla Roles almacena los roles de usuario en el sistema.
Create Table Roles (
	rolID INT PRIMARY KEY IDENTITY(1,1),
	nombreRol varchar(25)
);

-- ------------------------------------- Roles Values ----------------------------------
INSERT INTO Roles (nombreRol)
VALUES ('Administrador'), ('Estilista'), ('Cliente');

-- ------------------------------------- Table Usuarios ----------------------------------
-- La tabla Usuarios almacena información sobre los usuarios del sistema, incluyendo administradores, estilistas y clientes.
CREATE TABLE Usuarios (
    usuarioID INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
	telefono VARCHAR(20),
    correo VARCHAR(100) NOT NULL,
    direccion VARCHAR(255),
    contra VARCHAR(60) NOT NULL,
    rolID INT,
	estado varchar(15),
    CONSTRAINT fk_Usuarios_rolID FOREIGN KEY (rolID) REFERENCES Roles(rolID) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT UQ_Usuarios_correo UNIQUE (correo)
);

-- ------------------------------------- Table BitacoraCliente ----------------------------------
-- La tabla BitacoraCliente registra la actividad y los eventos relacionados con los clientes del sistema.
CREATE TABLE BitacoraCliente (
    bitacoraID INT PRIMARY KEY IDENTITY(1,1),
    clienteID INT,
    fechaRegistro DATETIME,
    CONSTRAINT fk_bitacoraClientes_clienteID FOREIGN KEY(clienteID) REFERENCES Usuarios(usuarioID) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- ------------------------------------- Table BitacoraEstilista ----------------------------------
-- La tabla BitacoraEstilista registra la actividad y los eventos relacionados con los estilistas del sistema.
CREATE TABLE BitacoraEstilista (
    bitacoraID INT PRIMARY KEY IDENTITY(1,1),
    estilistaID INT,
    fechaIngreso DATE,
    fechaSalida DATE,
    CONSTRAINT fk_bitacoraEstilistas_estilistaID FOREIGN KEY(estilistaID) REFERENCES Usuarios(usuarioID) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- ------------------------------------- Table Servicios ----------------------------------
-- La tabla Servicios almacena información sobre los servicios ofrecidos por el estudio.
create table Servicios (
	servicioID INT PRIMARY KEY IDENTITY(1,1),
	nombreServicio varchar(50),
	descripcion varchar(255),
	tiempoEstimado VARCHAR(5) CHECK (tiempoEstimado LIKE '[0-2][0-9]:[0-5][0-9]'),
	precio INT,
	rutaImagen varchar(150)
);

-- ------------------------------------- Table Horarios ----------------------------------
-- La tabla Horarios almacena los horarios de trabajo de los estilistas.
create table Horarios (
	horariosID INT PRIMARY KEY IDENTITY(1,1),
	estilistaID INT,
	diaSemana VARCHAR(20),
	horaInicio TIME,
	horaFinal TIME,
    CONSTRAINT fk_Horarios_estilistaID FOREIGN KEY(estilistaID) REFERENCES Usuarios(usuarioID) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- ------------------------------------- Table EstadoCita ----------------------------------
-- La tabla EstadoCita almacena los estados posibles de las citas.
CREATE TABLE EstadoCita (
    estadoID INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50)
);

INSERT INTO EstadoCita (nombre)
VALUES ('Programada'), ('Confirmada'), ('Cancelada');

-- ------------------------------------- Table Citas ----------------------------------
-- La tabla Citas almacena información sobre las citas programadas entre clientes y estilistas.
create table Citas (
	citaID INT PRIMARY KEY IDENTITY(1,1),
	clienteID INT,
	estilistaID INT,
	comentarios varchar(150),
	estadoID INT,
    CONSTRAINT fk_Citas_clienteID FOREIGN KEY(clienteID) REFERENCES Usuarios(usuarioID) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT fk_Citas_estilistaID FOREIGN KEY(estilistaID) REFERENCES Usuarios(usuarioID) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT fk_Citas_estadoID FOREIGN KEY(estadoID) REFERENCES EstadoCita(estadoID) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- ------------------------------------- Table HorariosReservados ----------------------------------
-- La tabla HorariosReservados almacena los horarios bloqueados debido a citas reservadas.
create table HorariosReservados (
	citaID INT PRIMARY KEY IDENTITY(1,1),
    dia DATE,
    hora_inicio TIME,
    hora_fin TIME,
    CONSTRAINT fk_HorariosReservados_citaID FOREIGN KEY(citaID) REFERENCES Citas(citaID) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- ------------------------------------- Table DetallesCita ----------------------------------
-- La tabla DetallesCita almacena los detalles de cada cita, incluidos los servicios seleccionados.
create table DetallesCita  (
    detalleID INT PRIMARY KEY IDENTITY(1,1),
    citaID INT,
    servicioID INT,
    CONSTRAINT fk_DetallesCita_citaID FOREIGN KEY (citaID) REFERENCES Citas(citaID),
    CONSTRAINT fk_DetallesCita_servicioID FOREIGN KEY (servicioID) REFERENCES Servicios(servicioID)
);

-- ------------------------------------- Table BloqueoHorarios ----------------------------------
-- La tabla BloqueoHorarios almacena los horarios bloqueados manualmente por los estilistas.
 create table BloqueoHorarios (
	bloqueoID INT PRIMARY KEY IDENTITY(1,1),
	estilistaID	INT,
	dia VARCHAR(20),
	horaInicio TIME,
	horaFinal TIME,
	motivo varchar(150),
    CONSTRAINT fk_BloqueoHorarios_estilistaID FOREIGN KEY(estilistaID) REFERENCES Usuarios(usuarioID) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- ------------------------------------- Table ActividadCliente ----------------------------------
-- La tabla ActividadCliente almacena información sobre la actividad reciente de los clientes.
create table ActividadCliente (
	actividadID INT PRIMARY KEY IDENTITY(1,1),
	clienteID INT,
	ultimaConexion DATETIME,
	ultimaCitaID INT,
    CONSTRAINT fk_ActividadCliente_clienteID FOREIGN KEY(clienteID) REFERENCES Usuarios(usuarioID) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_ActividadCliente_ultimaCitaID FOREIGN KEY(ultimaCitaID) REFERENCES Citas(citaID) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- ------------------------------------- Table HistorialCitas ----------------------------------
-- La tabla HistorialCitas almacena el historial de citas de los clientes.
create table HistorialCitas (
	historialCitasID INT PRIMARY KEY IDENTITY(1,1),
	clienteID INT,
	citaID INT,
    CONSTRAINT fk_HistorialCitas_clienteID FOREIGN KEY(clienteID) REFERENCES Usuarios(usuarioID) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_HistorialCitas_citaID FOREIGN KEY(citaID) REFERENCES Citas(citaID) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- ------------------------------------- Table PuntosClientes ----------------------------------
-- La tabla PuntosClientes registra los puntos acumulados y canjeados por los clientes.
create table PuntosClientes(
	puntosID INT PRIMARY KEY IDENTITY(1,1),
	clienteID INT,
	puntosAcumulados INT CHECK (puntosAcumulados >= 0 AND puntosAcumulados <= 100000),
	puntosCanjeados INT,
    CONSTRAINT fk_PuntosClientes_clienteID FOREIGN KEY(clienteID) REFERENCES Usuarios(usuarioID) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- ------------------------------------- Table HistorialRecompensas ----------------------------------
-- La tabla HistorialRecompensas registra el historial de recompensas reclamadas por los clientes.
create table HistorialRecompensas(
	historialID INT PRIMARY KEY IDENTITY(1,1),
	clienteID INT,
	servicioID INT,
	puntosCanjeados INT,
	fecha DATETIME,
    CONSTRAINT fk_HistorialRecompensas_clienteID FOREIGN KEY(clienteID) REFERENCES Usuarios(usuarioID) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_HistorialRecompensas_servicioID FOREIGN KEY(servicioID) REFERENCES Servicios(servicioID) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- ------------------------------------- Table PuntosServicio ----------------------------------
-- La tabla PuntosServicio registra los puntos otorgados por cada servicio.
create table PuntosServicio(
	servicioID INT PRIMARY KEY IDENTITY(1,1),
	puntosGenerados INT,
    CONSTRAINT fk_PuntosServicio_servicioID FOREIGN KEY(servicioID) REFERENCES Servicios(servicioID) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE CuponesCanjeados (
    cuponCanjeadoID INT PRIMARY KEY IDENTITY(1,1),
    cuponID INT,
    clienteID INT,
    fecha DATE,
    valorPuntos DECIMAL(10, 2),
    estado VARCHAR(50)
);
