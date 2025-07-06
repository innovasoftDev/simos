-- CreateTable
CREATE TABLE "Users" (
    "id_user" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "username" VARCHAR(70) NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "phoneNumber" TEXT,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "status" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "tbl_usr_roles_id_rol" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "TBL_USR_ROLES" (
    "id_rol" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "descripcion" VARCHAR(70),
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TBL_USR_ROLES_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "Objeto" (
    "Id_Objeto" TEXT NOT NULL,
    "Nombre_Objeto" TEXT NOT NULL,
    "Descripcion" TEXT,
    "Tipo_Objeto" TEXT NOT NULL,
    "Estado" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Objeto_pkey" PRIMARY KEY ("Id_Objeto")
);

-- CreateTable
CREATE TABLE "Permisos" (
    "Id_Permiso" TEXT NOT NULL,
    "Permiso_Inserta" BOOLEAN NOT NULL,
    "Permiso_Actualiza" BOOLEAN NOT NULL,
    "Permiso_Elimina" BOOLEAN NOT NULL,
    "Permiso_Consulta" BOOLEAN NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "ObjetoId" TEXT NOT NULL,
    "TBL_USR_ROLESId" TEXT NOT NULL,

    CONSTRAINT "Permisos_pkey" PRIMARY KEY ("Id_Permiso")
);

-- CreateTable
CREATE TABLE "Grup_Servidores" (
    "Id_Grup_Servidor" TEXT NOT NULL,
    "Nombre_Grupo_Servidores" TEXT NOT NULL,
    "Descripcion" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grup_Servidores_pkey" PRIMARY KEY ("Id_Grup_Servidor")
);

-- CreateTable
CREATE TABLE "Servidores" (
    "Id_Servidor" TEXT NOT NULL,
    "Nombre_Servidor" TEXT NOT NULL,
    "Descripcion" TEXT,
    "CPU" TEXT,
    "Memoria" TEXT,
    "Tipo_Sevidor" TEXT,
    "Nombre_AD" TEXT,
    "URL" TEXT,
    "Estado" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "Grup_ServidorId" TEXT NOT NULL,

    CONSTRAINT "Servidores_pkey" PRIMARY KEY ("Id_Servidor")
);

-- CreateTable
CREATE TABLE "Servicios" (
    "Id_Servicio" TEXT NOT NULL,
    "Nombre_Servicio" TEXT NOT NULL,
    "Descripcion" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "Estado" TEXT NOT NULL,
    "ServidorId" TEXT NOT NULL,

    CONSTRAINT "Servicios_pkey" PRIMARY KEY ("Id_Servicio")
);

-- CreateTable
CREATE TABLE "Errores_Servidor" (
    "Id_Error_Servidor" TEXT NOT NULL,
    "Codigo_Error" TEXT NOT NULL,
    "Descripcion_Error" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "Estado" TEXT NOT NULL,
    "ServidorId" TEXT NOT NULL,

    CONSTRAINT "Errores_Servidor_pkey" PRIMARY KEY ("Id_Error_Servidor")
);

-- CreateTable
CREATE TABLE "Errores_Servicio" (
    "Id_Error_Servicio" TEXT NOT NULL,
    "Codigo_Error" TEXT NOT NULL,
    "Descripcion_Error" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "Estado" TEXT NOT NULL,
    "ServicioId" TEXT NOT NULL,

    CONSTRAINT "Errores_Servicio_pkey" PRIMARY KEY ("Id_Error_Servicio")
);

-- CreateTable
CREATE TABLE "Alertas_Servicio" (
    "Id_Alerta_Servicio" TEXT NOT NULL,
    "Codigo_Alerta" TEXT NOT NULL,
    "Descripcion_Alerta" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "Estado" TEXT NOT NULL,
    "ServicioId" TEXT NOT NULL,

    CONSTRAINT "Alertas_Servicio_pkey" PRIMARY KEY ("Id_Alerta_Servicio")
);

-- CreateTable
CREATE TABLE "Exitosas_Servicio" (
    "Id_Exito_Servicio" TEXT NOT NULL,
    "Codigo_Exito" TEXT NOT NULL,
    "Descripcion_Exito" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "Estado" TEXT NOT NULL,
    "ServicioId" TEXT NOT NULL,

    CONSTRAINT "Exitosas_Servicio_pkey" PRIMARY KEY ("Id_Exito_Servicio")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TBL_USR_ROLES_rol_key" ON "TBL_USR_ROLES"("rol");

-- CreateIndex
CREATE UNIQUE INDEX "Objeto_Nombre_Objeto_key" ON "Objeto"("Nombre_Objeto");

-- CreateIndex
CREATE UNIQUE INDEX "Grup_Servidores_Nombre_Grupo_Servidores_key" ON "Grup_Servidores"("Nombre_Grupo_Servidores");

-- CreateIndex
CREATE UNIQUE INDEX "Servidores_Nombre_Servidor_key" ON "Servidores"("Nombre_Servidor");

-- CreateIndex
CREATE UNIQUE INDEX "Servicios_Nombre_Servicio_key" ON "Servicios"("Nombre_Servicio");

-- CreateIndex
CREATE UNIQUE INDEX "Errores_Servidor_Codigo_Error_key" ON "Errores_Servidor"("Codigo_Error");

-- CreateIndex
CREATE UNIQUE INDEX "Errores_Servicio_Codigo_Error_key" ON "Errores_Servicio"("Codigo_Error");

-- CreateIndex
CREATE UNIQUE INDEX "Alertas_Servicio_Codigo_Alerta_key" ON "Alertas_Servicio"("Codigo_Alerta");

-- CreateIndex
CREATE UNIQUE INDEX "Exitosas_Servicio_Codigo_Exito_key" ON "Exitosas_Servicio"("Codigo_Exito");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_tbl_usr_roles_id_rol_fkey" FOREIGN KEY ("tbl_usr_roles_id_rol") REFERENCES "TBL_USR_ROLES"("id_rol") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permisos" ADD CONSTRAINT "Permisos_ObjetoId_fkey" FOREIGN KEY ("ObjetoId") REFERENCES "Objeto"("Id_Objeto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permisos" ADD CONSTRAINT "Permisos_TBL_USR_ROLESId_fkey" FOREIGN KEY ("TBL_USR_ROLESId") REFERENCES "TBL_USR_ROLES"("id_rol") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servidores" ADD CONSTRAINT "Servidores_Grup_ServidorId_fkey" FOREIGN KEY ("Grup_ServidorId") REFERENCES "Grup_Servidores"("Id_Grup_Servidor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servicios" ADD CONSTRAINT "Servicios_ServidorId_fkey" FOREIGN KEY ("ServidorId") REFERENCES "Servidores"("Id_Servidor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Errores_Servidor" ADD CONSTRAINT "Errores_Servidor_ServidorId_fkey" FOREIGN KEY ("ServidorId") REFERENCES "Servidores"("Id_Servidor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Errores_Servicio" ADD CONSTRAINT "Errores_Servicio_ServicioId_fkey" FOREIGN KEY ("ServicioId") REFERENCES "Servicios"("Id_Servicio") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alertas_Servicio" ADD CONSTRAINT "Alertas_Servicio_ServicioId_fkey" FOREIGN KEY ("ServicioId") REFERENCES "Servicios"("Id_Servicio") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exitosas_Servicio" ADD CONSTRAINT "Exitosas_Servicio_ServicioId_fkey" FOREIGN KEY ("ServicioId") REFERENCES "Servicios"("Id_Servicio") ON DELETE CASCADE ON UPDATE CASCADE;
