import { Users, Shield } from "lucide-react";
import { UserStatus } from "./schema";
import { getAllRoles } from "@/actions/admin/roles/getAllRoles";
import { Role } from "@/app/dashboard/admin/roles/data/schema";
import { useEffect, useState } from "react";

async function getData(): Promise<Role[]> {
  const { roles = [] } = await getAllRoles();

  // Fetch data from your API here.
  return roles;
}

export function UsersRoles() : Role[] {
  const [data, setData] = useState<Role[]>([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  return data;
}

export const callTypes = new Map<UserStatus, string>([
  ["active", "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200"],
  ["inactive", "bg-neutral-300/40 border-neutral-300"],
]);

export const userTypes = [
  {
    label: "Admin",
    value: "admin",
    icon: Shield,
  },
  {
    label: "User",
    value: "user",
    icon: Users,
  },
] as const;

export const userStatus = [
  {
    label: "Activo",
    value: "active",
    icon: Shield,
  },
  {
    label: "Inactivo",
    value: "inactive",
    icon: Users,
  },
] as const;
