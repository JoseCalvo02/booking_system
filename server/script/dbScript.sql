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