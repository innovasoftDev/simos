import { getPaginatedUsers } from '@/actions/admin/users/get-users';
import type { User } from "@/interfaces";

export const usersData = async () => {
  const { users = [] } = await getPaginatedUsers();
  
  return (
    Array.from(users.values())
  )
}

/* export const users = Array.from({ length: 20 }, () => {
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    username: faker.internet
      .username({ firstName, lastName })
      .toLocaleLowerCase(),
    email: faker.internet.email({ firstName }).toLocaleLowerCase(),
    phoneNumber: faker.phone.number({ style: 'international' }),
    status: faker.helpers.arrayElement([
      'active',
      'inactive'
    ]),
    role: faker.helpers.arrayElement([
      'admin',
      'normal'
    ]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
}) */