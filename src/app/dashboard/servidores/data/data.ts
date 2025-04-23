import {
  User,
  Shield,
} from 'lucide-react';
import { ServerStatus } from './schema'
import { ServerGroup } from "../data/schema";
import { useEffect, useState } from 'react';
import { GetAllServersGroups } from "@/actions/dashboard/servidores/get-groupServers";

async function getData(): Promise<ServerGroup[]> {
  const { groups = [] } = await GetAllServersGroups();

  // Fetch data from your API here.
  return groups;
}

export function ServerGroups() : ServerGroup[] {
  const [data, setData] = useState<ServerGroup[]>([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  return data;
}

export const callTypes = new Map<ServerStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
])

export const serverStatus = [
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
