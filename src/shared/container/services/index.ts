import { container } from "tsyringe";

import { IPrismaService } from "./prisma/IPrismaService";
import { PrismaService } from "./prisma/PrismaService";

container.register<IPrismaService>("PrismaService", PrismaService);
