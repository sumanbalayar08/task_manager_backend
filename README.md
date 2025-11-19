# Task Manager Backend

A robust RESTful API backend for task management built with Node.js, Express, TypeScript, and PostgreSQL. This project provides user authentication and comprehensive task management capabilities.

## 🚀 Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Task Prioritization**: Tasks can be marked as LOW, MEDIUM, or HIGH priority
- **Database Integration**: PostgreSQL with Prisma ORM for type-safe database operations
- **Input Validation**: Comprehensive validation using class-validator and class-transformer
- **Error Handling**: Centralized error handling with custom HTTP exceptions
- **Security**: Password hashing with bcrypt and secure cookie handling
- **CORS Support**: Configured for cross-origin requests
- **TypeScript**: Full TypeScript support for better development experience

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: class-validator, class-transformer
- **Environment**: dotenv
- **Development**: ts-node-dev, nodemon

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sumanbalayar08/task_manager_backend.git
cd task_manager_backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment setup

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/task_manager_db"

# Server
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=10m
```

### 4. Database setup

```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Seed the database with sample data
npm run prisma:seed
```

### 5. Start the development server

```bash
npm run start:dev
```

The server will start on `http://localhost:5000` (or your configured PORT).

## 📁 Project Structure

```
task_manager_backend/
├── src/
│   ├── app.ts                 # Main application entry point
│   ├── config/                # Configuration files
│   ├── controllers/           # Route controllers
│   │   ├── auth.controller.ts
│   │   └── task.controller.ts
│   ├── dto/                   # Data Transfer Objects
│   │   ├── auth.dto.ts
│   │   └── task.dto.ts
│   ├── middleware/            # Custom middleware
│   ├── routes/                # API routes
│   │   ├── auth.routes.ts
│   │   └── task.routes.ts
│   ├── services/              # Business logic services
│   │   ├── auth.services.ts
│   │   └── task.services.ts
│   └── utils/                 # Utility functions
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── seed.ts               # Database seeding script
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 🔗 API Endpoints

### Authentication Routes (`/api`)

- `POST /api/register` - Register a new user
- `POST /api/login` - User login
- `POST /api/logout` - User logout

### Task Routes (`/api/tasks`)

- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 📊 Database Schema

### User Model

```typescript
interface User {
  id: string; // UUID
  email: string; // Unique
  name: string;
  password: string; // Hashed
  createdAt: DateTime;
  updatedAt: DateTime;
  tasks: Task[]; // Relation
}
```

### Task Model

```typescript
interface Task {
  id: string; // UUID
  userId: string; // Foreign key
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  endDate: DateTime;
  createdAt: DateTime;
  updatedAt: DateTime;
  user: User; // Relation
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. Users register with email, name, and password
2. Password is hashed using bcrypt before storage
3. On successful login, a JWT token is issued
4. Token is sent in HTTP-only cookies for security
5. Protected routes require valid authentication

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- HTTP-only cookies for token storage
- CORS configuration for cross-origin requests
- Input validation and sanitization
- Environment variable protection

## 🧪 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run start:dev

# Build the project
npm run build

# Start production server
npm run start

# Prisma commands
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run migrations
npm run prisma:studio      # Open Prisma Studio
npm run prisma:seed        # Seed database
npm run prisma:reset       # Reset database
npm run prisma:push        # Push schema to database
npm run prisma:deploy      # Deploy migrations
```

### Code Style

- TypeScript for type safety
- Express.js for REST API
- Prisma for database operations
- Structured with controllers, services, and routes
- Comprehensive error handling
- Input validation with DTOs

## 🚀 Deployment

### Production Build

```bash
# Build the TypeScript project
npm run build

# Run database migrations
npm run prisma:deploy

# Start the production server
npm start
```

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Set to 'production'
- `FRONTEND_URL` - Your frontend application URL
- `JWT_SECRET` - Secure JWT secret key
- `JWT_EXPIRES_IN` - Token expiration time

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**: Ensure PostgreSQL is running and DATABASE_URL is correct
2. **Migration Issues**: Run `npm run prisma:migrate` to update database schema
3. **JWT Token Issues**: Check JWT_SECRET environment variable
4. **CORS Issues**: Verify FRONTEND_URL environment variable matches your frontend URL

### Getting Help

- Check the console logs for detailed error messages
- Ensure all environment variables are properly set
- Verify database connection and migrations
- Check API endpoint URLs and request formats

## 📈 Future Enhancements

- [ ] Task categories and tags
- [ ] Task search and filtering
- [ ] Team collaboration features
- [ ] Real-time notifications
- [ ] File attachments for tasks
- [ ] Task templates
- [ ] Analytics and reporting
- [ ] Email notifications
- [ ] Mobile API support
- [ ] GraphQL API
- [ ] Redis caching
- [ ] Rate limiting
- [ ] API documentation with Swagger

---

Built with ❤️ using Node.js, Express, TypeScript, and Prisma
