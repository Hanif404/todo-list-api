import { Request, Response } from "express";
import { ChecklistUseCase } from "../../usecase/checklist/checklist.usecase";
import { ChecklistRepository } from "../../domain/repositories-impl/checklist.repository.impl";
import MessageError from "../../utils/error/MessageError";
import status from "http-status";

const checklistUseCase = new ChecklistUseCase(new ChecklistRepository());

export class ChecklistController {
  static async list(req: Request, res: Response) {
    try {
      const id = Number(req.user?.id)

      const user = await checklistUseCase.list(id);
      res.success(user, 'Success get list');
    } catch (err: any) {
      throw new MessageError({
        statusCode: status.INTERNAL_SERVER_ERROR,
        code: "ERR_INTERNAL_SERVER",
        message: err.message
      })
    }
  }

  static async create(req: Request, res: Response) {
    try {
      req.body.userId = Number(req.user?.id)
      const data = await checklistUseCase.create(req.body);
      res.success(data, 'Success create data');
    } catch (err: any) {
      throw new MessageError({
        statusCode: status.INTERNAL_SERVER_ERROR,
        code: "ERR_INTERNAL_SERVER",
        message: err.message
      })
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const checklistId = Number(req.params.checklistId)
      const data = await checklistUseCase.delete(checklistId);
      res.success(data, 'Success delete data');
    } catch (err: any) {
      throw new MessageError({
        statusCode: status.INTERNAL_SERVER_ERROR,
        code: "ERR_INTERNAL_SERVER",
        message: err.message
      })
    }
  }
}