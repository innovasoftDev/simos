//import { initialRolesData } from "./seed";
import {
  CreateUser,
  CreatePantallas,
  CreatePermiso,
  CreateGrupoServers,
  CreateServer,
  CreateServicio,
  CreateAlerta,
  CreateError,
  CreateExito,
} from "./seed-actions";
import prisma from "@/lib/prisma";

//import bcryptjs from "bcryptjs";
//import prisma from "../lib/prisma";

interface SeedRole {
  rol: "admin" | "user";
  descripcion: string | null;
  created: Date;
}

interface SeedRoles {
  roles: SeedRole[];
}

export const initialRolesData: SeedRoles = {
  roles: [
    {
      rol: "admin",
      descripcion: "Usuario Administrador",
      created: new Date(),
    },
    {
      rol: "user",
      descripcion: "Usuario Normal de prueba",
      created: new Date(),
    },
  ],
};



async function main() {
  //! Borrar registros previos
  await prisma.user.deleteMany();
  await prisma.permiso.deleteMany();
  await prisma.objeto.deleteMany();
  await prisma.tBL_USR_ROLES.deleteMany();
  await prisma.servicio.deleteMany();
  await prisma.servidor.deleteMany();
  await prisma.grup_Servidor.deleteMany();
  await prisma.exito_Servicio.deleteMany();
  await prisma.alerta_Servicio.deleteMany();
  await prisma.error_Servicio.deleteMany();

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
    "$123456789Tn",
    "admin",
    "active"
  );
  //? Creando usuario normal
  CreateUser(
    "user",
    "Usuario",
    "Normal",
    "user@google.com",
    "$123456789Tn",
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
  //? Exitosos
  CreatePantallas(
    "Exitosos",
    "Lista de registros de errores detectados en los servicios y servidores.",
    "Pantalla",
    "active"
  );
  //? Alertas
  CreatePantallas(
    "Alertas",
    "Lista de registros de alertas generadas por el sistema cuando se detectan problemas o anomalías.",
    "Pantalla",
    "active"
  );
  //? Errores
  CreatePantallas(
    "Errores",
    "Lista de registros de errores detectados en los servicios y servidores.",
    "Pantalla",
    "active"
  );
  //? Grupo Servidores
  CreatePantallas(
    "GrupoServidores",
    "Lista de grupo de servidores cuales dan referencia acerca del país donde se encuentran.",
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
  // Para Admin
  CreatePermiso(true, true, true, true, "Dashboard", "admin");
  CreatePermiso(true, true, true, true, "Servicios", "admin");
  CreatePermiso(true, true, true, true, "Servidores", "admin");
  CreatePermiso(true, true, true, true, "Alertas", "admin");
  CreatePermiso(true, true, true, true, "Errores", "admin");
  CreatePermiso(true, true, true, true, "AcercaDe", "admin");
  CreatePermiso(true, true, true, true, "Exitosos", "admin");
  // Para Usuario
  CreatePermiso(false, false, false, true, "Servicios", "user");
  CreatePermiso(false, false, false, true, "Servidores", "user");
  CreatePermiso(false, false, false, true, "Dashboard", "user");
  CreatePermiso(false, false, false, true, "Alertas", "user");
  CreatePermiso(false, false, false, true, "Errores", "user");
  CreatePermiso(false, false, false, true, "AcercaDe", "user");
  CreatePermiso(false, false, false, true, "Exitosos", "user");

  await delay(100);

  //! Para Vista Servidores
  //? Creando el grupo principal que contendrá todos los servers registrados en Honduras
  CreateGrupoServers("Servers_HN", "Servidores para la región de Honduras.");

  await delay(100);

  //? Creando dos servidores de ejemplo
  CreateServer("ICOMMERCE_TGU", "Servidor de ventas TGU.", "Servers_HN");
  CreateServer("ICOMMERCE_SPS", "Servidor de ventas SPS.", "Servers_HN");

  await delay(100);

  //! Para la vista servicios
  //? Creando dos servicios de ejemplo
  CreateServicio(
    "API_ICOMMERCE_TGU",
    "API de ventas TGU.",
    "active",
    "ICOMMERCE_TGU"
  );
  CreateServicio(
    "API_ICOMMERCE_SPS",
    "API de ventas SPS.",
    "inactive",
    "ICOMMERCE_SPS"
  );

  await delay(100);
  //! Para la vista exitosas
  //? Creando dos servicios de ejemplo
  CreateExito(
    "active",
    "200 OK",
    "La solicitud ha tenido éxito. El significado de un éxito varía dependiendo del método HTTP.",
    "API_ICOMMERCE_TGU"
  );
  CreateExito(
    "active",
    "201 Created",
    "La solicitud ha tenido éxito y se ha creado un nuevo recurso como resultado de ello.",
    "API_ICOMMERCE_TGU"
  );
  CreateExito(
    "active",
    "202 Accepted",
    "La solicitud se ha recibido, pero aún no se ha actuado. Es una petición (sin compromiso).",
    "API_ICOMMERCE_TGU"
  );
  CreateExito(
    "active",
    "204 No Content",
    "La petición se ha completado con éxito, pero su contenido no se ha obtenido de la fuente originalmente solicitada, sino que se recoge de una copia local o de un tercero.",
    "API_ICOMMERCE_TGU"
  );

  await delay(100);
  //! Para la vista alertas
  //? Creando dos servicios de ejemplo
  CreateAlerta(
    "active",
    "100 Continue",
    "Esta respuesta provisional indica que todo hasta ahora está bien y que el cliente debe continuar con la solicitud o ignorarla si ya está terminada.",
    "API_ICOMMERCE_TGU"
  );
  CreateAlerta(
    "active",
    "101 Switching Protocol",
    "Envía en respuesta a un encabezado de solicitud Upgrade por el cliente e indica que el servidor acepta el cambio de protocolo propuesto por el agente de usuario.",
    "API_ICOMMERCE_TGU"
  );
  CreateAlerta(
    "active",
    "102 Processing",
    "Este código indica que el servidor ha recibido la solicitud y aún se encuentra procesandola, por lo que no hay respuesta disponible.",
    "API_ICOMMERCE_TGU"
  );
  CreateAlerta(
    "active",
    "103 Early Hints",
    "Este código de estado es usado con el encabezado Link, permitiendo que el agente de usuario empiece a pre-cargar recursos mientras el servidor prepara una respuesta.",
    "API_ICOMMERCE_TGU"
  );

  await delay(100);
  //! Para la vista errores
  //? Creando dos servicios de ejemplo
  CreateError(
    "active",
    "400 Bad Request",
    "Esta respuesta significa que el servidor no pudo interpretar la solicitud dada una sintaxis inválida.",
    "API_ICOMMERCE_TGU"
  );
  CreateError(
    "active",
    "401 Unauthorized",
    "Es necesario autenticar para obtener la respuesta solicitada. Esta es similar a 403, pero en este caso, la autenticación es posible.",
    "API_ICOMMERCE_TGU"
  );
  CreateError(
    "active",
    "403 Forbidden",
    "El cliente no posee los permisos necesarios para cierto contenido, por lo que el servidor está rechazando otorgar una respuesta apropiada.",
    "API_ICOMMERCE_TGU"
  );
  CreateError(
    "active",
    "404 Not Found",
    "El servidor no pudo encontrar el contenido solicitado. Este código de respuesta es uno de los más famosos dada su alta ocurrencia en la web.",
    "API_ICOMMERCE_TGU"
  );

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
