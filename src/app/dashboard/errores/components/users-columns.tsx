import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import LongText from "@/components/long-text";
import { Errors } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { callTypes } from "../data/data";

export const columns: ColumnDef<Errors>[] = [
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
    accessorKey: "Codigo_Error",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código Error" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-sm">{row.getValue("Codigo_Error")}</LongText>
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
    accessorKey: "Descripcion_Error",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripcion" />
    ),
    cell: ({ row }) => {
      return (
        <LongText className="max-w-sm">
          {row.getValue("Descripcion_Error")}
        </LongText>
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
    accessorKey: "Servicio.Nombre_Servicio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Servicio" />
    ),
    cell: ({ row }) => {
      const { Servicio } = row.original;
      const nombreServicio = Servicio.Nombre_Servicio;
      return <LongText className="max-w-sm">{nombreServicio}</LongText>;
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
    accessorKey: "created",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha creación" />
    ),
    cell: ({ row }) => {
      const { created } = row.original;
      const fechaCreacion = created.toLocaleDateString();
      return <LongText className="max-w-sm">{fechaCreacion}</LongText>;
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
    accessorKey: "created",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hora creación" />
    ),
    cell: ({ row }) => {
      const { created } = row.original;
      const horaCreacion = created.toLocaleTimeString();
      return <LongText className="max-w-sm">{horaCreacion}</LongText>;
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
    accessorKey: "Estado",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const { Estado } = row.original;
      const badgeColor = callTypes.get(Estado);
      return (
        <div className="flex space-x-2">
          <Badge variant="outline" className={cn("capitalize", badgeColor)}>
            {row.getValue("Estado")}
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
