import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import LongText from "@/components/long-text";
import { callTypes, userTypes } from "../data/data";
import { User } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36">{row.getValue("username")}</LongText>
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
    id: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      const fullName = `${firstName} ${lastName}`;
      return <LongText className="max-w-36">{fullName}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.getValue("email")}</div>
    ),
  },
   {
  accessorKey: "created",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Fecha Creación" />
  ),
  cell: ({ row }) => {
    const rawDate = row.getValue("created") as string;

    const formattedDate = rawDate
      ? new Date(rawDate).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";

    return <div className="w-fit text-nowrap">{formattedDate}</div>;
  },
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
    accessorKey: "rol.rol",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rol" />
    ),
    cell: ({ row }) => {
      const { rol } = row.original;

      //const role = ObternerRol(tbl_usr_roles_id_rol);
      const userType = userTypes.find(({ value }) => value === rol.rol);

      if (!userType) {
        return <div className="w-fit text-nowrap">{rol.rol}</div>;
      }

      return (
        <div className="flex gap-x-2 items-center">
          {userType.icon && (
            <userType.icon size={16} className="text-muted-foreground" />
          )}
          <span className="capitalize text-sm">
            {rol.rol}
          </span>
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
