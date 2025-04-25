import { User, Shield } from "lucide-react";
import { ExitosoStatus } from "./schema";

export const callTypes = new Map<ExitosoStatus, string>([
  ["active", "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200"],
  ["inactive", "bg-neutral-300/40 border-neutral-300"],
]);

export const serverStatus = [
  {
    label: "Activo",
    value: "active",
    icon: Shield,
  },
  {
    label: "Inactivo",
    value: "inactive",
    icon: User,
  },
] as const;
