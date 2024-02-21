/****** -------------------------------------	Proyecto FabiStudioNails Creado por: Mario Cordero/Jose Calvo / 18/02/2024---------------------------------- ******/

/****** -------------------------------------	Table Roles	---------------------------------- ******/
Create Table Roles (
	rolID INT PRIMARY KEY IDENTITY(1,1),
	nombreRol varchar(25)
);

/****** -------------------------------------	Roles Values	---------------------------------- ******/
INSERT INTO Roles (nombreRol)
VALUES ('Administrador'), ('Estilista'), ('Cliente');

/****** -------------------------------------	Table Clientes	---------------------------------- ******/
create table Clientes (
	clienteID INT PRIMARY KEY IDENTITY(1,1),
	nombre varchar(50),
	apellidos varchar(50),
	correo varchar(50),
	telefono varchar(50),
	direccion varchar(150),
	puntosGanados INT CHECK (puntosGanados >= 0 AND puntosGanados <= 100000),
	puntosCanjeados INT CHECK (puntosCanjeados >= 0 AND puntosCanjeados <= 100000),
	contraseña varchar(8),
	rolID INT,
	estado varchar(15)
);

ALTER TABLE Clientes ADD CONSTRAINT fk_rolID FOREIGN KEY(rolID) REFERENCES Roles(rolID) ON DELETE NO ACTION ON UPDATE NO ACTION;

/****** -------------------------------------	Table Administradores	---------------------------------- ******/
create table Administradores (
	adminID INT PRIMARY KEY IDENTITY(1,1),
	nombre varchar(50),
	apellidos varchar(50),
	correo varchar(50),
	contraseña varchar(8),
	rolID INT
);

ALTER TABLE Administradores ADD CONSTRAINT fk_rolID_2 FOREIGN KEY(rolID) REFERENCES Roles(rolID) ON DELETE NO ACTION ON UPDATE NO ACTION;

/****** -------------------------------------	Table Estilistas	---------------------------------- ******/
create table Estilistas (
	estilistaID INT PRIMARY KEY IDENTITY(1,1),
	nombre varchar(50),
	apellidos varchar(50),
	telefono varchar(50),
	direccion varchar(150),
	fechaIngreso date,
	fechaSalida date,
	correo varchar(50),
	contraseña varchar(8),
	rolID INT,
	estado varchar(15)
);

ALTER TABLE Estilistas ADD CONSTRAINT fk_rolID_3 FOREIGN KEY(RolID) REFERENCES Roles(rolID) ON DELETE NO ACTION ON UPDATE NO ACTION;

/****** -------------------------------------	Table Catalogo	---------------------------------- ******/
create table catalogo (
	servicioID INT PRIMARY KEY IDENTITY(1,1),
	nombreServicio varchar(50),
	descripcion varchar(150),
	precio INT
);

/****** -------------------------------------	Table galeriaEstilos	---------------------------------- ******/

create table galeriaEstilos (
	estiloID INT PRIMARY KEY IDENTITY(1,1),
	nombreEstilo varchar(50),
	rutaImagen varchar(150)
);

/****** -------------------------------------	Table detalleServicio	---------------------------------- ******/

create table detalleServicio (
	detalleID INT PRIMARY KEY IDENTITY(1,1),
	servicioID INT,
	tiempoEstimado TIME
);

ALTER TABLE detalleServicio ADD CONSTRAINT fk_servicioID FOREIGN KEY(servicioID) REFERENCES catalogo(servicioID) ON DELETE NO ACTION ON UPDATE NO ACTION;

/****** -------------------------------------	Table disponibilidadTiempoReal	---------------------------------- ******/

create table disponibilidadTiempoReal (
	disponibilidadID INT PRIMARY KEY IDENTITY(1,1),
	estilistaID	INT,
	diaSemana VARCHAR(20),
	horaInicio TIME,
	horaFinal TIME
);

ALTER TABLE disponibilidadTiempoReal ADD CONSTRAINT fk_estilistaID FOREIGN KEY(estilistaID) REFERENCES estilistas(estilistaID) ON DELETE NO ACTION ON UPDATE NO ACTION;

 -------------------------------------	Table citas	---------------------------------- ******/

 create table citas (
	citaID INT PRIMARY KEY IDENTITY(1,1),
	clienteID	INT,
	estilistaID INT,
	servicioID INT,
	fechaCita DATETIME,
	estiloID INT,
	comentarios varchar(150)
);

ALTER TABLE citas ADD CONSTRAINT fk_clienteID FOREIGN KEY(clienteID) REFERENCES clientes(clienteID) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE citas ADD CONSTRAINT fk_estilistaID_2 FOREIGN KEY(estilistaID) REFERENCES estilistas(estilistaID) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE citas ADD CONSTRAINT fk_servicioID_2 FOREIGN KEY(servicioID) REFERENCES catalogo(servicioID) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE citas ADD CONSTRAINT fk_estiloID FOREIGN KEY(estiloID) REFERENCES galeriaEstilos(estiloID) ON DELETE NO ACTION ON UPDATE NO ACTION;

 -------------------------------------	Table citasReagendadas	---------------------------------- ******/

create table citasReagendadas (
	reagendadaID INT PRIMARY KEY IDENTITY(1,1),
	citaID	INT,
	idCitaNueva INT,
	fechaNuevaCita DATETIME,
	motivo varchar(150)
);

ALTER TABLE citasReagendadas ADD CONSTRAINT fk_citaID FOREIGN KEY(citaID) REFERENCES citas(citaID) ON DELETE NO ACTION ON UPDATE NO ACTION;


 -------------------------------------	Table bloqueoHorarios	---------------------------------- ******/
 create table bloqueoHorarios (
	bloqueoID INT PRIMARY KEY IDENTITY(1,1),
	estilistaID	INT,
	dia VARCHAR(20),
	horaInicio TIME,
	horaFinal TIME,
	motivo varchar(150)
);

ALTER TABLE bloqueoHorarios ADD CONSTRAINT fk_estilistaID_3 FOREIGN KEY(estilistaID) REFERENCES estilistas(estilistaID) ON DELETE NO ACTION ON UPDATE NO ACTION;