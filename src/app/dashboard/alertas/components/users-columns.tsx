import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import LongText from "@/components/long-text";
import { callTypes, userTypes } from "../data/data";
import { Service } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { getRoleById } from "@/actions/admin/roles/getRoleById";
import { useEffect, useState } from "react";

async function getRole(id: string): Promise<string> {
  const rol = await getRoleById(id);

  return rol;
}

function ObternerRol(id: string): string {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    getRole(id).then(setData);
  }, [id]);

  return data;
}

export const columns: ColumnDef<Service>[] = [
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
    accessorKey: "nombre_servicio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alerta servicio" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.getValue("nombre_servicio")}</div>
    ),
  },
  {
    accessorKey: "descripcion",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripción" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36">{row.getValue("descripcion")}</LongText>
    ),
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
    accessorKey: "id_servidor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Codigo Alerta" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.getValue("id_servidor")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const { status } = row.original;
      const badgeColor = callTypes.get(status);
      return (
        <div className="flex space-x-2">
          <Badge variant="outline" className={cn("capitalize", badgeColor)}>
            {row.getValue("status")}
          </Badge>
        </div>
      );
    },
    filterFn: "weakEquals",
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
];
