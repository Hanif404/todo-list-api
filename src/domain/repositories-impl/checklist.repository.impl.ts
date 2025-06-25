import { prisma, Prisma } from "../../config/prisma";
import { IChecklistRepository } from "../repositories/checklist.repository";
import { Checklist } from "../entities/checklist.entities";

export class ChecklistRepository implements IChecklistRepository {
  async findAll(id: number): Promise<any> {
    return await prisma.checklist.findMany({ where: { userId: id } });
  }

  async create(checklist: Partial<Checklist>): Promise<Checklist> {
    // Add type guard to ensure userId is not null
    if (!checklist.userId) {
      throw new Error('userId is required');
    }

    const checklistData: Prisma.ChecklistCreateInput = {
      name: checklist.name!,
      user: {
        connect: {
          id: checklist.userId,
        },
      },
    };
    return await prisma.checklist.create({ data: checklistData });
  }

  async delete(id: number): Promise<null> {
    return await prisma.checklist.delete({ where: { id } });
  }
}