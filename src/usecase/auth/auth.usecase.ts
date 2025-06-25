import { IUserRepository } from "../../domain/repositories/user.repository";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt";

export class AuthUseCase {
  constructor(private userRepo: IUserRepository) {}

  async login(username: string, password: string) {
    const user = await this.userRepo.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    return { token: generateToken(user.id) };
  }

  async register(data: { username: string; email: string; password: string }) {
    const hashed = await bcrypt.hash(data.password, 10);
    return this.userRepo.create({ ...data, password: hashed });
  }
}