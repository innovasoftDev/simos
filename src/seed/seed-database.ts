import { initialRolesData } from "./seed";
import { CreateUser, CreatePantallas, CreatePermiso, CreateGrupoServers, CreateServer, CreateServicio } from "./actions";
import prisma from "../lib/prisma";

async function main() {
  //! Borrar registros previos
  await prisma.user.deleteMany();
  await prisma.permiso.deleteMany();
  await prisma.objeto.deleteMany();
  await prisma.tBL_USR_ROLES.deleteMany();
  await prisma.servicio.deleteMany();
  await prisma.servidor.deleteMany();
  await prisma.grup_Servidor.deleteMany();
  
  //! Para vista roles
  //? Creando roles admin y user
  const { roles } = initialRolesData;
  await prisma.tBL_USR_ROLES.createMany({
    data: roles,
  });

  await delay(100);

  //! Para Vista Usuarios
  //? Creando usuario administrador
  CreateUser(
    "admin",
    "Usuario",
    "Administrador",
    "admin@google.com",
    "12345678",
    "admin",
    "active"
  );
  //? Creando usuario normal
  CreateUser(
    "user",
    "Usuario",
    "Normal",
    "user@google.com",
    "12345678",
    "user",
    "inactive"
  );
  await delay(100);
  
  //! Creando las pantallas actuales en gestion de pantallas
  //? Dashboard
  CreatePantallas(
    "Dashboard",
    "Es la pantalla principal del sistema de monitoreo, proporcionando una visión general del estado de los servicios, servidores y alertas.",
    "Pantalla",
    "active"
  );
  //? Servicios
  CreatePantallas(
    "Servicios",
    "Indica métricas como tiempo de respuesta, latencia, uso de recursos y número de peticiones procesadas.",
    "Pantalla",
    "active"
  );
  //? Servidores
  CreatePantallas(
    "Servidores",
    "Presenta información detallada sobre los servidores que ejecutan los servicios.",
    "Pantalla",
    "active"
  );
  //? Alertas
  CreatePantallas(
    "Alertas",
    "Lista las alertas generadas por el sistema cuando se detectan problemas o anomalías.",
    "Pantalla",
    "active"
  );
  //? Errores
  CreatePantallas(
    "Errores",
    "Muestra registros de errores detectados en los servicios y servidores.",
    "Pantalla",
    "active"
  );
  //? Acerca De
  CreatePantallas(
    "AcercaDe",
    "Sobre nosotros el grupo de Innovasoft Dev.",
    "Pantalla",
    "active"
  );

  await delay(100);

  //! Para vista Permisos
  //? Creando permiso para Dashboard
  CreatePermiso(true, false, true, false, "Dashboard", "admin");
  CreatePermiso(true, true, true, true, "Servicios", "admin");
  CreatePermiso(true, true, true, true, "Servidores", "admin");
  CreatePermiso(true, true, true, true, "Alertas", "admin");
  CreatePermiso(true, true, true, true, "Errores", "admin");  
  CreatePermiso(true, false, true, false, "AcercaDe", "admin");

  await delay(100);

  //! Para Vista Servidores
  //? Creando el grupo principal que contendrá todos los servers registrados en Honduras
  CreateGrupoServers("Servers_HN", "Servidores para la región de Honduras.");

  await delay(100);

  //? Creando dos servidores de ejemplo
  CreateServer("ICOMMERCE_TGU", "Serveridor de ventas TGU.", "Servers_HN");
  CreateServer("ICOMMERCE_SPS", "Serveridor de ventas SPS.", "Servers_HN");

  await delay(100);

  //! Para la vista servicios
  //? Creando dos servicios de ejemplo
  CreateServicio("API_ICOMMERCE_TGU", "API de ventas TGU.", "active", "ICOMMERCE_TGU");
  CreateServicio("API_ICOMMERCE_sps", "API de ventas SPS.", "inactive", "ICOMMERCE_SPS");
  

  console.log("Seed ejecutado correctamente");
}

// Simple delay function using setTimeout and promise
export const delay = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
