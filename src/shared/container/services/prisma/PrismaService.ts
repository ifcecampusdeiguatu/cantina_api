import { PrismaClient } from "@prisma/client";

import { IPrismaService } from "./IPrismaService";

export class PrismaService implements IPrismaService {
  prisma: PrismaClient = null;

  getConnection(): PrismaClient {
    if (!this.prisma) {
      this.prisma = new PrismaClient();
    }

    return this.prisma;
  }
}
