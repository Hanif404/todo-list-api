import { IChecklistRepository } from "../../domain/repositories/checklist.repository";

export class ChecklistUseCase {
  constructor(private checklistRepo: IChecklistRepository) {}

  async list(id: number) {
    return await this.checklistRepo.findAll(id);
  }

  async create(data: { name: string; userId: number}) {
    return await this.checklistRepo.create(data);
  }

  async delete(id: number) {
    return await this.checklistRepo.delete(id);
  }
}