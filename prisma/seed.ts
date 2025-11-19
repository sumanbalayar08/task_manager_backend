import { PrismaClient, Priority } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  await prisma.task.deleteMany();
  await prisma.user.deleteMany();
  console.log('🧹 Cleared existing data');

  const user = await prisma.user.create({
    data: {
      email: 'sumanbalayar62@gmail.com',
      name: 'Suman Balayar',
      password: await bcrypt.hash('Suman@123', 10),
    },
  });

  console.log(`👤 Created user: ${user.name}`);

  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        userId: user.id,
        title: 'Complete project setup',
        description: 'Finish the initial project configuration',
        priority: Priority.HIGH,
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.task.create({
      data: {
        userId: user.id,
        title: 'Review code',
        description: 'Review pull requests',
        priority: Priority.MEDIUM,
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.task.create({
      data: {
        userId: user.id,
        title: 'Update documentation',
        description: 'Update API documentation',
        priority: Priority.LOW,
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  console.log(`📋 Created ${tasks.length} tasks`);
  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });