import bcryptjs from 'bcryptjs';

interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user'
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {

  users: [
    {
      email: 'admin@google.com',
      name: 'Administrador',
      password: bcryptjs.hashSync('12345678'),
      role: 'admin'
    },
    {
      email: 'user@google.com',
      name: 'Usuario',
      password: bcryptjs.hashSync('12345678'),
      role: 'user'
    },
  ],
};