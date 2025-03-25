"use client";
import { useEffect, useState } from "react";
import { ShieldPlus } from 'lucide-react';
import useDialogState from "@/hooks/use-dialog-state";
import { Button } from "@/components/ui/button";
import { Main } from "@/components/layout/main";
import { UsersActionDialog } from "./components/users-action-dialog";
import { columns } from "./components/users-columns";
import { UsersDeleteDialog } from "./components/users-delete-dialog";
import { RolesTable } from "./components/roles-table";
import UsersContextProvider, {
  type UsersDialogType,
} from "./context/users-context";
import { Role } from "./data/schema";
import { getAllRoles } from "@/actions/admin/roles/getAllRoles";
import PageContainer from "@/components/layout/page-container";

async function getData(): Promise<Role[]> {
  const { roles = [] } = await getAllRoles();

  // Fetch data from your API here.
  return roles;
}

export default function RolesPage() {
  const [data, setData] = useState<Role[]>([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  // Dialog states
  const [currentRow, setCurrentRow] = useState<Role | null>(null);
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
                Roles
              </h2>
              <p className="text-muted-foreground">
                Administra aquí a sus roles.
              </p>
            </div>
            <div className="flex gap-2">
              <Button className="space-x-1" onClick={() => setOpen("add")}>
                <span>Agregar Role</span> <ShieldPlus size={18} />
              </Button>
            </div>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <RolesTable data={data} columns={columns} />
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
              key={`user-edit-${currentRow.id_rol}`}
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
              key={`user-delete-${currentRow.id_rol}`}
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
