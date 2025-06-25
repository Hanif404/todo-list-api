import { Request, Response } from "express";
import { AuthUseCase } from "../../usecase/auth/auth.usecase";
import { UserRepository } from "../../domain/repositories-impl/user.repository.impl";

const authUseCase = new AuthUseCase(new UserRepository());

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const user = await authUseCase.register(req.body);
      res.json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const data = await authUseCase.login(req.body.username, req.body.password);
      res.json(data);
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }
}