import {
  User,
  Shield,
} from 'lucide-react';


export const userTypes = [
  {
    label: 'Admin',
    value: 'admin',
    icon: Shield,
  },
  {
    label: 'User',
    value: 'user',
    icon: User,
  },
] as const
