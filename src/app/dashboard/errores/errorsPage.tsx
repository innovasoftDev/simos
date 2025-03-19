"use client";
import { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import useDialogState from "@/hooks/use-dialog-state";
import { Button } from "@/components/ui/button";
import { Main } from "@/components/layout/main";
import { UsersActionDialog } from "./components/users-action-dialog";
import { columns } from "./components/users-columns";
import { UsersDeleteDialog } from "./components/users-delete-dialog";
import { getUsers } from "@/actions/admin/users/get-users";
import { UsersTable } from "./components/users-table";
import UsersContextProvider, {
  type UsersDialogType,
} from "./context/users-context";
import { Service } from "./data/schema";
import PageContainer from "@/components/layout/page-container";

/* async function getData(): Promise<Service[]> {
  const { users = [] } = await getUsers();

  // Fetch data from your API here.
  return users;
} */

export default function ErrorsPage() {
  /* const [data, setData] = useState<Service[]>([]);

  useEffect(() => {
    getData().then(setData);
  }, []); */

  const data: Service[] = [
    {
      id_servicio: "123456789",
      id_servidor: "123456789",
      nombre_servicio: "Error 401",
      descripcion: " Acceso no autorizado, inicio de sesión con las credenciales adecuadas para acceder a este recurso.",
      status: "active",
      created: null,
      updated: null,
    },
    {
      id_servicio: "123456789",
      id_servidor: "123456789",
      nombre_servicio: "Error 403",
      descripcion: "Acceso Prohibido, No tiene el permiso necesario para ver este recurso.",
      status: "inactive",
      created: null,
      updated: null,
    },
    {
      id_servicio: "123456789",
      id_servidor: "123456789",
      nombre_servicio: "Error 404",
      descripcion: "Página no encontrada, la página que se busca no existe o ha sido eliminada.",
      status: "inactive",
      created: null,
      updated: null,
    },
    {
      id_servicio: "123456789",
      id_servidor: "123456789",
      nombre_servicio: "Error 500",
      descripcion: "Algo salió mal, Intentalo de más tarde.",
      status: "inactive",
      created: null,
      updated: null,
    },
    {
      id_servicio: "123456789",
      id_servidor: "123456789",
      nombre_servicio: "Error 503",
      descripcion: "El sitio web está en mantenimiento. No está disponible en este momento. Pronto estará en línea.",
      status: "inactive",
      created: null,
      updated: null,
    },
    
  ];

  // Dialog states
  const [currentRow, setCurrentRow] = useState<Service | null>(null);
  const [open, setOpen] = useDialogState<UsersDialogType>(null);

  return (
    <PageContainer scrollable>
      <UsersContextProvider
        value={{ open, setOpen, currentRow, setCurrentRow }}
      >
        <Main>
          <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Errores
              </h2>
              <p className="text-muted-foreground">
                Administra aquí los errores registrados.
              </p>
            </div>
            {/* <div className="flex gap-2">
              <Button className="space-x-1" onClick={() => setOpen("add")}>
                <span>Agregar Servicio</span> <UserPlus size={18} />
              </Button>
            </div> */}
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <UsersTable data={data} columns={columns} />
          </div>
        </Main>

        <UsersActionDialog
          key="user-add"
          open={open === "add"}
          onOpenChange={() => setOpen("add")}
        />

        {currentRow && (
          <>
            <UsersActionDialog
              key={`user-edit-${currentRow.id_servicio}`}
              open={open === "edit"}
              onOpenChange={() => {
                setOpen("edit");
                setTimeout(() => {
                  setCurrentRow(null);
                }, 500);
              }}
              currentRow={currentRow}
            />

            <UsersDeleteDialog
              key={`user-delete-${currentRow.id_servicio}`}
              open={open === "delete"}
              onOpenChange={() => {
                setOpen("delete");
                setTimeout(() => {
                  setCurrentRow(null);
                }, 500);
              }}
              currentRow={currentRow}
            />
          </>
        )}
      </UsersContextProvider>
    </PageContainer>
  );
}
