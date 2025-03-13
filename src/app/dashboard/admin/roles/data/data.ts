import {
  User,
  Shield
} from 'lucide-react';
import { UserStatus } from './schema'

export const callTypes = new Map<UserStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300']
])

export const userTypes = [
  {
    label: 'Admin',
    value: 'admin',
    icon: Shield,
  },
  {
    label: 'Normal',
    value: 'normal',
    icon: User,
  },
] as const
