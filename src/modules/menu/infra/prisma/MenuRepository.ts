import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

import { ICreateMenuDTO } from "@modules/menu/dtos/ICreateMenuDTO";
import { IMenuRepository } from "@modules/menu/repositories/IMenuRepository";
import { PrismaClient } from "@prisma/client";
import { IPrismaService } from "@shared/container/services/prisma/IPrismaService";

import { Menu } from "../entities/Menu";

@injectable()
export class MenuRepository implements IMenuRepository {
  repository: PrismaClient;
  constructor(
    @inject("PrismaService")
    private prisma: IPrismaService
  ) {
    this.repository = prisma.getConnection();
  }

  async create({ schedule, localID }: ICreateMenuDTO): Promise<Menu> {
    const menu = await this.repository.menu.create({
      data: {
        id: v4(),
        schedule,
        localID,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return menu;
  }
}
