export type Bitacora = {
  id_bitacora: string;
  id_user: string;
  username: string;
  fechaHora: Date;
  accion: string;
  descripcion: string | null;
  entidad: string;
};