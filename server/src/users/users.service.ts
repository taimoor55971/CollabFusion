// // This is your Prisma schema file,
// // learn more about it in the docs: https://pris.ly/d/prisma-schema

// generator client {
//     provider = "prisma-client-js"
//   }
  
//   datasource db {
//     provider = "postgresql"
//     url      = env("DATABASE_URL")
//   }
  
//   model User {
//     id                Int      @id @default(autoincrement())
//     username          String   @unique
//     email             String   @unique
//     password          String
//     role              String    
//     adminTasks        Tasks[]  @relation("AdminTasks")
//     collaboratorTasks Tasks[]  @relation("CollaboratorTasks")
//     commits           Commit[]
//   }
  
//   model Tasks {
//     id               Int      @id @default(autoincrement())
//     taskTitle         String
//     startingDate     DateTime
//     adminId          Int
//     numCollaborators Int
//     numCommits       Int
//     admin            User     @relation("AdminTasks", fields: [adminId], references: [id])
//     collaborators    User[]   @relation("CollaboratorTasks")
//     commits          Commit[] @relation("TaskCommits")
//   }
  
//   model Commit {
//     id      Int    @id @default(autoincrement())
//     taskId  Int
//     userId  Int
//     message String
//     // ... other commit-related fields
  
//     // Relationship with tasks: A commit is associated with one task
//     task Tasks @relation("TaskCommits", fields: [taskId], references: [id])
  
//     // Relationship with users: A commit is made by one user
//     user User @relation(fields: [userId], references: [id])
//   }
  