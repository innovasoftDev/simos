import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import LongText from "@/components/long-text";
import { Pantalla } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { callTypes } from "../data/data";

function SwitchConsultar(stateSwitch: boolean) {
  const [state, setEnabled] = useState(stateSwitch);

  return (
    <div className="flex items-center space-x-2">
      <Switch id="select" checked={state} onCheckedChange={setEnabled} />
    </div>
  );
}

function SwitchInsertar(stateSwitch: boolean) {
  const [state, setEnabled] = useState(stateSwitch);

  return (
    <div className="flex items-center space-x-2">
      <Switch id="insert" checked={state} onCheckedChange={setEnabled} />
    </div>
  );
}

function SwitchActualizar(stateSwitch: boolean) {
  const [state, setEnabled] = useState(stateSwitch);

  return (
    <div className="flex items-center space-x-2">
      <Switch id="update" checked={state} onCheckedChange={setEnabled} />
    </div>
  );
}

function SwitchEliminar(stateSwitch: boolean) {
  const [state, setEnabled] = useState(stateSwitch);

  return (
    <div className="flex items-center space-x-2">
      <Switch id="delete" checked={state} onCheckedChange={setEnabled} />
    </div>
  );
}

export const columns: ColumnDef<Pantalla>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
        className="translate-y-[2px]"
      />
    ),
    meta: {
      className: cn(
        "sticky md:table-cell left-0 z-10 rounded-tl",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted"
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar Columna"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ObjetoId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rol" />
    ),
    cell: ({ row }) => {
      const { TBL_USR_ROLES } = row.original;
      const rol = TBL_USR_ROLES.rol;
      return <LongText className="max-w-sm">{rol}</LongText>;
    },
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky left-6 md:table-cell"
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: "TBL_USR_ROLESId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pantalla" />
    ),
    cell: ({ row }) => {
      const { Objeto } = row.original;
      const objeto = Objeto.Nombre_Objeto;
      return <LongText className="max-w-36">{objeto}</LongText>;
    },
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky left-6 md:table-cell"
      ),
    },
    enableHiding: false,
  },
  {
    id: "Permiso_Consulta",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CONSULTA" />
    ),
    cell: ({ row }) => {
      const { Permiso_Consulta } = row.original;
      var status: string = "";
      if (Permiso_Consulta) {
        status = "active";
      } else {
        status = "inactive";
      }
      const badgeColor = callTypes.get(status);
      return (
        <div className="flex space-x-2">
          <Badge variant="outline" className={cn("capitalize", badgeColor)}>
            {status}
          </Badge>
        </div>
      );
    },
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky left-6 md:table-cell"
      ),
    },
    enableHiding: false,
  },
  {
    id: "Permiso_Inserta",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="INSERTAR" />
    ),
    cell: ({ row }) => {
      const { Permiso_Inserta } = row.original;
      var status: string = "";
      if (Permiso_Inserta) {
        status = "active";
      } else {
        status = "inactive";
      }
      const badgeColor = callTypes.get(status);
      return (
        <div className="flex space-x-2">
          <Badge variant="outline" className={cn("capitalize", badgeColor)}>
            {status}
          </Badge>
        </div>
      );
    },
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky left-6 md:table-cell"
      ),
    },
    enableHiding: false,
  },
  {
    id: "Permiso_Actualiza",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ACTUALIZAR" />
    ),
    cell: ({ row }) => {
      const { Permiso_Actualiza } = row.original;
      var status: string = "";
      if (Permiso_Actualiza) {
        status = "active";
      } else {
        status = "inactive";
      }
      const badgeColor = callTypes.get(status);
      return (
        <div className="flex space-x-2">
          <Badge variant="outline" className={cn("capitalize", badgeColor)}>
            {status}
          </Badge>
        </div>
      );
    },
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky left-6 md:table-cell"
      ),
    },
    enableHiding: false,
  },
  {
    id: "Permiso_Elimina",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ELIMINAR" />
    ),
    cell: ({ row }) => {
      const { Permiso_Elimina } = row.original;
      var status: string = "";
      if (Permiso_Elimina) {
        status = "active";
      } else {
        status = "inactive";
      }
      const badgeColor = callTypes.get(status);
      return (
        <div className="flex space-x-2">
          <Badge variant="outline" className={cn("capitalize", badgeColor)}>
            {status}
          </Badge>
        </div>
      );
    },
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky left-6 md:table-cell"
      ),
    },
    enableHiding: false,
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
];
