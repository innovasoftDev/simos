import { NavItem } from '@/components/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Servidores',
    url: '/dashboard/servidores',
    icon: 'servericon',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Servicios',
    url: '/dashboard/servicios',
    icon: 'handPlatter',
    shortcut: ['e', 'e'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Exitosos',
    url: '/dashboard/exitosos',
    icon: 'CircleCheck',
    shortcut: ['e', 'e'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Alertas',
    url: '/dashboard/alertas',
    icon: 'alert',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Errores',
    url: '/dashboard/errores',
    icon: 'error',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Acerca de',
    url: '/dashboard/about',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  }
];

export const navAdminItems: NavItem[] = [
  {
    title: 'Seguridad',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'segurity',
    isActive: false,

    items: [
      {
        title: 'Usuarios',
        url: '/dashboard/admin/users',
        icon: 'pizza',
        shortcut: ['u', 'u']
      },
      {
        title: 'Pantallas',
        url: '/dashboard/admin/pantallas',
        icon: 'moon',
        shortcut: ['p', 'p']
      },
      {
        title: 'Roles',
        url: '/dashboard/admin/roles',
        icon: 'laptop',
        shortcut: ['r', 'r']
      },
      {
        title: 'Permisos',
        shortcut: ['e', 'e'],
        url: '/dashboard/admin/permisos',
        icon: 'logout'
      }
    ]
  },
  {
    title: 'Errores',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'Bug',
    isActive: false,

    items: [
      {
        title: 'Unauthorized',
        url: '/401',
        icon: 'Lock',
        shortcut: ['u', 'u']
      },
      {
        title: 'Forbidden',
        url: '/403',
        icon: 'UserRoundX',
        shortcut: ['f', 'f']
      },
      {
        title: 'Not Found',
        url: '/404',
        icon: 'Ban',
        shortcut: ['n', 'n']
      },
      {
        title: 'Internal Server Error',
        shortcut: ['i', 'i'],
        url: '/500',
        icon: 'ServerOff'
      },
      {
        title: 'Maintenance Error',
        shortcut: ['m', 'm'],
        url: '/503',
        icon: 'Construction'
      }
    ]
  },
];
