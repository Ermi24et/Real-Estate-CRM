import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize prisma client
const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  // create two dummy users
  const passwordErmias = await bcrypt.hash('lilermi-password', roundsOfHashing);
  const passwordlilj = await bcrypt.hash('lilj-password', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'lilermi@gmail.com' },
    update: {
      password: passwordErmias,
    },
    create: {
      firstName: 'ermias',
      lastName: 'tk',
      email: 'lilermi@gmail.com',
      password: passwordErmias,
      isEmailVerified: false,
      phoneNumber: '333',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'lilj@gmail.com' },
    update: {
      password: passwordErmias,
    },
    create: {
      firstName: 'j',
      lastName: 'tf',
      email: 'lilj@gmail.com',
      password: passwordlilj,
      isEmailVerified: false,
      phoneNumber: '222',
    },
  });

  console.log(user1, user2);

  // create dummy property
  const prop1 = await prisma.property.upsert({
    where: { name: '3f' },
    update: {},
    create: {
      name: '3f',
      price: 2000,
      builtAt: 2020,
      numbersOfRoom: 10,
      numbersOfBathRoom: 20,
      numbersOfBedRoom: 20,
      isSold: false,
      location: 'Addis Ababa',
    },
  });

  const prop2 = await prisma.property.upsert({
    where: { name: 'g5' },
    update: {},
    create: {
      name: 'g5',
      price: 2000,
      builtAt: 2020,
      numbersOfRoom: 10,
      numbersOfBathRoom: 20,
      numbersOfBedRoom: 20,
      isSold: false,
      location: 'Addis Ababa',
    },
  });

  console.log(prop1, prop2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close prisma client at the end
    await prisma.$disconnect();
  });
