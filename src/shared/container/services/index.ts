import { container } from "tsyringe";

import { IPrismaService } from "./prisma/IPrismaService";
import { PrismaService } from "./prisma/PrismaService";

container.registerSingleton<IPrismaService>("PrismaService", PrismaService);
