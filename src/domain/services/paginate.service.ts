import { Prisma, prisma } from "../../config/prisma";
import MessageError from "../../utils/error/MessageError";

export type ModelNames =
    (typeof Prisma.ModelName)[keyof typeof Prisma.ModelName];

type PrismaOperations<ModelName extends ModelNames> =
    Prisma.TypeMap['model'][ModelName]['operations'];

type PrismaFindManyArgs<ModelName extends ModelNames> =
    PrismaOperations<ModelName>['findMany']['args'];

type PaginationOptions<ModelName extends ModelNames> = {
    modelName: ModelName;
    where?: PrismaFindManyArgs<ModelName>['where'];
    orderBy?: PrismaFindManyArgs<ModelName>['orderBy'];
    select?: PrismaFindManyArgs<ModelName>['select'];
    page?: string;
    pageSize?: string;
};

class PaginateService<ModelName extends ModelNames> {
    async paginate({
        page,
        pageSize,
        modelName,
        where,
        orderBy,
        select,
    }: PaginationOptions<ModelName>) {
        try {
            // @ts-ignore
            const db = prisma[modelName];
            if (!page || !pageSize) {
                const data = await db.findMany({
                    where: where || {},
                    orderBy: orderBy || {
                        createdAt: 'asc',
                    },
                    select: select || {},
                });                
                return {
                    data,
                    totalData: data.length,
                };
            }
            const skip = (+page - 1) * +pageSize;
            const totalData = await db.count({
                where,
            });
            const data = await db.findMany({
                where,
                orderBy,
                select: select || {},
                skip,
                take: +pageSize,
            });
            
            return {
                data,
                meta:{
                    totalData,
                    page: +page,
                    pageSize: +pageSize,
                    lastPage: Math.ceil(totalData / +pageSize),
                }
            };
        } catch (error) {
            throw new MessageError({
                message: 'Data not found',
                statusCode: 404,
                code: 'ERR_NF'
            });
        }
    }
}

export default PaginateService;