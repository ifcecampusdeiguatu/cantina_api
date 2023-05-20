import { PrismaClient } from "@prisma/client";

import { IPrismaService } from "./IPrismaService";

export class PrismaService implements IPrismaService {
  prima: PrismaClient;

  constructor() {
    this.prima = new PrismaClient();
  }

  getConnection(): PrismaClient {
    return this.prima;
  }
}
