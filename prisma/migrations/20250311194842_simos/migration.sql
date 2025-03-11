-- CreateTable
CREATE TABLE `servicios` (
    `Id_Servicio` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre_Servicio` VARCHAR(125) NOT NULL,
    `Descripcion` VARCHAR(125) NOT NULL,
    `Fecha_Creacion` DATETIME(3) NOT NULL,
    `Servidores_Id_Servidores` INTEGER NOT NULL,

    INDEX `SERVICIOS_Servidores_Id_Servidores_fkey`(`Servidores_Id_Servidores`),
    PRIMARY KEY (`Id_Servicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servidores` (
    `Id_servidor` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre_Servidor` VARCHAR(125) NOT NULL,
    `Descripcion` VARCHAR(125) NOT NULL,
    `Fecha_Creacion` DATETIME(3) NOT NULL,
    `tbl_grupo_servidores_Id_Grupo_Servidor` INTEGER NOT NULL,

    INDEX `SERVIDORES_tbl_grupo_servidores_Id_Grupo_Servidor_fkey`(`tbl_grupo_servidores_Id_Grupo_Servidor`),
    PRIMARY KEY (`Id_servidor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_grupo_servidores` (
    `Id_Grupo_Servidor` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre_Grupo_Servidor` VARCHAR(125) NOT NULL,
    `Descripcion` VARCHAR(125) NOT NULL,
    `user_id_user` VARCHAR(191) NOT NULL,

    INDEX `TBL_GRUPO_SERVIDORES_user_id_user_fkey`(`user_id_user`),
    PRIMARY KEY (`Id_Grupo_Servidor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_hist_contrasenia` (
    `id_historial_contra` VARCHAR(191) NOT NULL,
    `contrasenia` VARCHAR(255) NULL,
    `user_id_user` VARCHAR(191) NULL,

    INDEX `TBL_HIST_CONTRASENIA_user_id_user_fkey`(`user_id_user`),
    PRIMARY KEY (`id_historial_contra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_objetos` (
    `id_objeto` VARCHAR(191) NOT NULL,
    `objeto` VARCHAR(70) NOT NULL,
    `descripcion` VARCHAR(70) NOT NULL,
    `tipo_objeto` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id_objeto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_permisos` (
    `id_permisos` VARCHAR(191) NOT NULL,
    `permiso_insertar` VARCHAR(50) NOT NULL,
    `permiso_consultar` VARCHAR(50) NOT NULL,
    `permiso_actualizar` VARCHAR(50) NOT NULL,
    `permiso_eliminar` VARCHAR(50) NOT NULL,
    `creador` VARCHAR(50) NOT NULL,
    `modificado_por` VARCHAR(50) NOT NULL,
    `fecha_creacion` DATETIME(0) NOT NULL,
    `fecha_modificacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `tbl_usr_roles_id_rol` VARCHAR(191) NOT NULL,
    `tbl_objetos_id_objeto` VARCHAR(191) NOT NULL,

    INDEX `TBL_PERMISOS_tbl_objetos_id_objeto_fkey`(`tbl_objetos_id_objeto`),
    INDEX `TBL_PERMISOS_tbl_usr_roles_id_rol_fkey`(`tbl_usr_roles_id_rol`),
    PRIMARY KEY (`id_permisos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_usr_roles` (
    `id_rol` VARCHAR(191) NOT NULL,
    `rol` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    `descripcion` VARCHAR(70) NULL,

    UNIQUE INDEX `TBL_USR_ROLES_rol_key`(`rol`),
    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id_user` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `username` VARCHAR(70) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` DATETIME(3) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NULL,
    `updated` DATETIME(3) NULL,
    `tbl_usr_roles_id_rol` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_tbl_usr_roles_id_rol_fkey`(`tbl_usr_roles_id_rol`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alertas_servidor` (
    `Id_Alertas_Servidor` INTEGER NOT NULL AUTO_INCREMENT,
    `Codigo_Alerta` VARCHAR(125) NOT NULL,
    `Descripcion_Alerta` VARCHAR(125) NOT NULL,
    `Fecha_Creacion` DATETIME(3) NOT NULL,
    `Servidores_Id_Servidores` INTEGER NOT NULL,

    INDEX `FK_ALERTAS_SERVIDOR_SERVIDORES`(`Servidores_Id_Servidores`),
    PRIMARY KEY (`Id_Alertas_Servidor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `errores_servidor` (
    `Id_Error_Servidor` INTEGER NOT NULL AUTO_INCREMENT,
    `Codigo_Error` VARCHAR(125) NOT NULL,
    `Descripcion_Error` VARCHAR(125) NOT NULL,
    `Servidores_Id_Servidores` INTEGER NOT NULL,

    INDEX `FK_ERRORES_SERVIDOR_SERVIDORES`(`Servidores_Id_Servidores`),
    PRIMARY KEY (`Id_Error_Servidor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
