-- ------------------------------------- Commands to select and drop the database tables ----------------------------------
DECLARE @dropCommands NVARCHAR(MAX) = '';

-- Generar comandos DROP CONSTRAINT para todas las restricciones de clave externa
SELECT @dropCommands = @dropCommands +
    'ALTER TABLE ' + QUOTENAME(tc.TABLE_SCHEMA) + '.' + QUOTENAME(tc.TABLE_NAME) +
    ' DROP CONSTRAINT ' + QUOTENAME(tc.CONSTRAINT_NAME) + ';' + CHAR(13)
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS AS tc
INNER JOIN INFORMATION_SCHEMA.TABLES AS t
    ON tc.TABLE_NAME = t.TABLE_NAME
    AND tc.TABLE_SCHEMA = t.TABLE_SCHEMA
WHERE tc.CONSTRAINT_TYPE = 'FOREIGN KEY';

-- Generar comandos DROP TABLE para todas las tablas en la base de datos
SELECT @dropCommands = @dropCommands +
    'DROP TABLE ' + QUOTENAME(TABLE_SCHEMA) + '.' + QUOTENAME(TABLE_NAME) + ';' + CHAR(13)
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE';

-- Imprimir los comandos DROP generados
PRINT @dropCommands;