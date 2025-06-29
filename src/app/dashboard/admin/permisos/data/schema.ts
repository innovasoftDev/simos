import { z } from "zod";

export type Pantalla = {
  Id_Permiso: string;
  Permiso_Inserta: boolean;
  Permiso_Actualiza: boolean;
  Permiso_Elimina: boolean;
  Permiso_Consulta: boolean;
  ObjetoId: string;
  created: Date;
  updated: Date;
  TBL_USR_ROLESId: string;
  Objeto: {
    Nombre_Objeto: string;
    Id_Objeto: string;
    Descripcion: string | null;
    Tipo_Objeto: string;
    Estado: string;
  };
  TBL_USR_ROLES: {
    rol: string;
    id_rol: string;
    descripcion: string | null;
  };
};

const pantallaStatusSchema = z.union([z.string(), z.string()]);
export type PantallaStatus = z.infer<typeof pantallaStatusSchema>;
