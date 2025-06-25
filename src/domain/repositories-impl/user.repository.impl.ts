import { prisma, Prisma } from "../../config/prisma";
import { IUserRepository } from "../repositories/user.repository";
import { User } from "../entities/user.entities";
import PaginateService from "../services/paginate.service";

export class UserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { username } });
  }

  async findById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async findAll(): Promise<any> {
    const paginateService = new PaginateService<Prisma.ModelName>();
    return await paginateService.paginate({
      modelName: 'User',
      select:{
        id:true,
        email:true,
        username:true
      },
      page:"1",
      pageSize:"10",
    })
  }

  async create(user: Partial<User>): Promise<User> {
    const userData: Prisma.UserCreateInput = {
      email: user.email!,
      username: user.username!,
      password: user.password!,
    };
    
    return await prisma.user.create({ data: userData });
  }
}