import {
  User,
  Shield,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { GetAllServersGroups } from "@/actions/dashboard/servidores/get-groupServers";
import { ServicioStatus } from './schema'
import { Server } from "@/app/dashboard/servidores/data/schema";
import { GetServidores } from "@/actions/dashboard/servidores/get-servidores";

async function getData(): Promise<Server[]> {
  const { servers = [], ok, message } = await GetServidores();

  // Fetch data from your API here.
  return servers;
}

export function Servers() : Server[] {
  const [data, setData] = useState<Server[]>([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  return data;
}

export const callTypes = new Map<ServicioStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
])

export const servicioStatus = [
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
