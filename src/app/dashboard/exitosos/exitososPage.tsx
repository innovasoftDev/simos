"use client";
import { useEffect, useState } from "react";
//import { UserPlus } from "lucide-react";
import useDialogState from "@/hooks/use-dialog-state";
//import { Button } from "@/components/ui/button";
import { Main } from "@/components/layout/main";
//import { UsersActionDialog } from "./components/users-action-dialog";
import { columns } from "./components/users-columns";
import { UsersDeleteDialog } from "./components/users-delete-dialog";
import { UsersTable } from "./components/users-table";
import UsersContextProvider, {
  type UsersDialogType,
} from "./context/users-context";
import { Exito } from "./data/schema";
import PageContainer from "@/components/layout/page-container";
import { GetExitosos } from "@/actions/dashboard/exitos/get-exitosos";
import { toast } from "sonner";

async function getData(): Promise<Exito[]> {
  const { exitosos = [], ok, message } = await GetExitosos();

  if (!ok) {
    toast.error("Mensaje", {
      description: message,
    });
  }
  // Fetch data from your API here.
  return exitosos;
}

export default function ExitososPage() {
  const [data, setData] = useState<Exito[]>([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  // Dialog states
  const [currentRow, setCurrentRow] = useState<Exito | null>(null);
  const [open, setOpen] = useDialogState<UsersDialogType>(null);

  return (
    <PageContainer scrollable>
      <UsersContextProvider
        value={{ open, setOpen, currentRow, setCurrentRow }}
      >
        <Main>
          <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Exitosos</h2>
              <p className="text-muted-foreground">
                Administra aquí a tus registros exitosos.
              </p>
            </div>
            {/* <div className="flex gap-2">
              <Button className="space-x-1" onClick={() => setOpen("add")}>
                <span>Agregar Servidor</span> <UserPlus size={18} />
              </Button>
            </div> */}
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <UsersTable data={data} columns={columns} />
          </div>
        </Main>

        {/* <UsersActionDialog
          key="user-add"
          open={open === "add"}
          onOpenChange={() => setOpen("add")}
        /> */}

        {currentRow && (
          <>
            {/* <UsersActionDialog
              key={`user-edit-${currentRow.Id_Exito_Servicio}`}
              open={open === "edit"}
              onOpenChange={() => {
                setOpen("edit");
                setTimeout(() => {
                  setCurrentRow(null);
                }, 500);
              }}
              currentRow={currentRow}
            /> */}

            <UsersDeleteDialog
              key={`user-delete-${currentRow.Id_Exito_Servicio}`}
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
