import { User, Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { getPaginatedUsers } from "@/actions/admin/users/get-users";

async function getData(): Promise<User[]> {
  const { users = [] } = await getPaginatedUsers();

  // Fetch data from your API here.
  return users;
}

export default async function MainTable() {
  const data = await getData();

  return <DataTable data={data} columns={columns} />;
}
