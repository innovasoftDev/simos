
import { UsersTable } from "./ui/UsersTableBasic";
import { getPaginatedUsers } from "@/actions/admin/users/get-users";

export default async function UsersPage() {
  const { users = [] } = await getPaginatedUsers();

  return <UsersTable data={users}></UsersTable>;
};
