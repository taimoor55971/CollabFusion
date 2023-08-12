import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [PrismaClient], // Provide PrismaClient as a singleton
  exports: [PrismaClient], // Export PrismaClient to make it available to other modules
})
export class PrismaModule {}
