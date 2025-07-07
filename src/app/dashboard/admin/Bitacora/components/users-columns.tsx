"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import LongText from "@/components/long-text";
import { Bitacora } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Bitacora>[] = [
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
    accessorKey: "id_bitacora",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Bitácora" />
    ),
    cell: ({ row }) => {
      const id = row.getValue("id_bitacora") as string;
      if (!id) return "";


      const shortId = `${id.substring(0, 4)}...${id.substring(id.length - 4)}`;
      return <div className="font-medium">{shortId}</div>;

    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Usuario" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-sm">{row.original.username}</LongText>
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
    accessorKey: "accion",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Acción" />
    ),
    cell: ({ row }) => {
      return (
        <LongText className="max-w-sm">{row.original.accion}</LongText>
      );
    },
    meta: { className: "w-36" },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "fechaHora",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha y Hora" />
    ),
    cell: ({ row }) => {
      const date = row.original.fechaHora;

      return date instanceof Date && !isNaN(date.getTime())
        ? date.toLocaleString()
        : "Fecha inválida";
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "descripcion",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Detalle" />
    ),
    cell: ({ row }) => {
      return (
        <LongText className="max-w-sm">
          {row.original.descripcion || "Sin descripción"}
        </LongText>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
];