import { PrismaClient, Priority } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();
  console.log('🧹 Cleared existing data');

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        name: 'John Doe',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
      },
    }),
    prisma.user.create({
      data: {
        email: 'mike.wilson@example.com',
        name: 'Mike Wilson',
      },
    }),
  ]);

  console.log(`👤 Created ${users.length} users`);

  const taskData = [
    {
      userId: users[0].id,
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the new API endpoints including request/response examples and error handling.',
      priority: Priority.HIGH,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
    {
      userId: users[0].id,
      title: 'Review pull requests',
      description: 'Review and approve pending pull requests from the development team.',
      priority: Priority.MEDIUM,
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    },
    {
      userId: users[0].id,
      title: 'Update dependencies',
      description: 'Check for and update outdated npm packages to improve security and performance.',
      priority: Priority.LOW,
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    },
    // Tasks for Jane Smith
    {
      userId: users[1].id,
      title: 'Design new dashboard',
      description: 'Create mockups and wireframes for the new analytics dashboard.',
      priority: Priority.HIGH,
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    },
    {
      userId: users[1].id,
      title: 'User research interviews',
      description: 'Conduct user interviews to gather feedback on the current product features.',
      priority: Priority.MEDIUM,
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    },
    {
      userId: users[1].id,
      title: 'Update color palette',
      description: 'Review and update the design system color palette for better accessibility.',
      priority: Priority.LOW,
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    },
    // Tasks for Mike Wilson
    {
      userId: users[2].id,
      title: 'Fix critical bugs',
      description: 'Address critical production bugs reported by customers in the last week.',
      priority: Priority.HIGH,
      endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    },
    {
      userId: users[2].id,
      title: 'Performance optimization',
      description: 'Optimize database queries and API response times for better performance.',
      priority: Priority.MEDIUM,
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    },
    {
      userId: users[2].id,
      title: 'Write unit tests',
      description: 'Increase test coverage by writing unit tests for core business logic.',
      priority: Priority.LOW,
      endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
    },
  ];

  const tasks = await Promise.all(
    taskData.map(task => prisma.task.create({ data: task }))
  );

  console.log(`📋 Created ${tasks.length} tasks`);

  // Display summary
  console.log('\n📊 Seeding Summary:');
  console.log(`- Users: ${users.length}`);
  console.log(`- Tasks: ${tasks.length}`);

  users.forEach(user => {
    const userTasks = tasks.filter(task => task.userId === user.id);
    console.log(`- ${user.name}: ${userTasks.length} tasks`);
  });

  console.log('\n✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });