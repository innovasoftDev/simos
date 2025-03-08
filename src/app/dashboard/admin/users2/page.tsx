import { getPaginatedUsers } from "@/actions/admin/users/get-users";
import { Pagination, Title } from "@/components";
import PageContainer from "@/components/layout/page-container";
import { redirect } from "next/navigation";
import useDialogState from "@/hooks/use-dialog-state";
import { Main } from "@/components/layout/main";
import { UsersTable } from "./ui/UsersTableBasic";
import UsersContextProvider, {
  type UsersDialogType,
} from "./context/users-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export default async function UsersPage() {
  const { ok, users = [] } = await getPaginatedUsers();
  // Dialog states
  /* const [currentRow, setCurrentRow] = useState<User | null>(null);
  const [open, setOpen] = useDialogState<UsersDialogType>(null); */

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <PageContainer scrollable>
      {/* <UsersContextProvider
        value={{ open, setOpen, currentRow, setCurrentRow }}
      > */}
      {/* <UsersTable users={ users } /> */}
      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Lista de usuarios
            </h2>
            <p className="text-muted-foreground">
              Administra aquí a tus usuarios y sus roles.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="space-x-1">
              <span>Agregar Usuario</span> <UserPlus size={18} />
            </Button>
          </div>
        </div>
        <UsersTable data={users}></UsersTable>
      </Main>
      {/* </UsersContextProvider> */}
    </PageContainer>
  );
}
