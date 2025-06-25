import { Checklist } from "../entities/checklist.entities";

export interface IChecklistRepository {
  findAll(id: number): Promise<any>;
  create(checklist: Partial<Checklist>): Promise<Checklist>;
  delete(id: number): Promise<Checklist>;
}