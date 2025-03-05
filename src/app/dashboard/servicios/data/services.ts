import { faker } from "@faker-js/faker";

export const services = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    name: faker.internet.username({ firstName }).toLocaleLowerCase(),
    description: faker.internet.username({ lastName }).toLocaleLowerCase(),
    server: faker.internet.username({ firstName }).toLocaleLowerCase(),
    status: faker.helpers.arrayElement(["active", "inactive"]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
});
