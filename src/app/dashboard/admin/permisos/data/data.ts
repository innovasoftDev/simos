import {
  User,
  Shield,
} from 'lucide-react';
import { PantallaStatus } from "./schema";
import { Pantalla } from "@/app/dashboard/admin/pantallas/data/schema";
import { getAllRoles } from "@/actions/admin/roles/getAllRoles";
import { Role } from "@/app/dashboard/admin/roles/data/schema";
import { useEffect, useState } from "react";
import { getAllPantallas } from '@/actions/admin/pantallas/getAllPantallas';

async function getData(): Promise<Role[]> {
  const { roles = [] } = await getAllRoles();

  // Fetch data from your API here.
  return roles;
}

async function getData2(): Promise<Pantalla[]> {
  const { pantallas = [] } = await getAllPantallas();

  // Fetch data from your API here.
  return pantallas;
}

export function UsersRoles() : Role[] {
  const [data, setData] = useState<Role[]>([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  return data;
}

export function GetObjetos() : Pantalla[] {
  const [data, setData] = useState<Pantalla[]>([]);

  useEffect(() => {
    getData2().then(setData);
  }, []);

  return data;
}

export const callTypes = new Map<PantallaStatus, string>([
  ["active", "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200"],
  ["inactive", "bg-neutral-300/40 border-neutral-300"],
]);

export const pantallaStatus = [
  {
    label: 'Activo',
    value: 'active',
    icon: Shield,
  },
  {
    label: 'Inactivo',
    value: 'inactive',
    icon: User,
  },
] as const
