import { PrismaClient } from "@prisma/client";

import { IPrismaService } from "./IPrismaService";

export class PrismaService implements IPrismaService {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getConnection(): PrismaClient {
    return this.prisma;
  }
}
