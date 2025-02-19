"use client";
import { useState } from "react";
import { UserPlus, MailPlus, ShieldCheck } from "lucide-react";
import useDialogState from "@/hooks/use-dialog-state";
import { Button } from "@/components/ui/button";
import { Main } from "@/components/layout/main";
import { UsersActionDialog } from "./components/users-action-dialog";
import { columns } from "./components/users-columns";
import { UsersDeleteDialog } from "./components/users-delete-dialog";
import { UsersInviteDialog } from "./components/users-invite-dialog";
import { UsersTable } from "./components/users-table";
import UsersContextProvider, {
  type UsersDialogType,
} from "./context/users-context";
import { User, userListSchema } from "./data/schema";
import { users } from "./data/users";
import PageContainer from "@/components/layout/page-container";

export default function UsersPage() {
  // Dialog states
  const [currentRow, setCurrentRow] = useState<User | null>(null);
  const [open, setOpen] = useDialogState<UsersDialogType>(null);

  // Parse user list
  const userList = userListSchema.parse(users);

  return (
    <PageContainer scrollable>
      <UsersContextProvider
        value={{ open, setOpen, currentRow, setCurrentRow }}
      >
        <Main>
          <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Lista de permisos
              </h2>
              <p className="text-muted-foreground">
                Administra aquí los permisos de los usuarios.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="space-x-1"
                onClick={() => setOpen("invite")}
              >
                <span>Invitar Usuario</span> <MailPlus size={18} />
              </Button>
              <Button className="space-x-1" onClick={() => setOpen("add")}>
                <span>Agregar Usuario</span> <UserPlus size={18} />
              </Button>
            </div>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <UsersTable data={userList} columns={columns} />
          </div>
        </Main>

        <UsersActionDialog
          key="user-add"
          open={open === "add"}
          onOpenChange={() => setOpen("add")}
        />

        <UsersInviteDialog
          key="user-invite"
          open={open === "invite"}
          onOpenChange={() => setOpen("invite")}
        />

        {currentRow && (
          <>
            <UsersActionDialog
              key={`user-edit-${currentRow.id}`}
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
              key={`user-delete-${currentRow.id}`}
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
