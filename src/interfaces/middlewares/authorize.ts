import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import status from "http-status";
import MessageError from "../../utils/error/MessageError";

export const authorize = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new MessageError({
      code: "ERR_UNAUTHORIZED",
      message: status[401],
      statusCode: status.UNAUTHORIZED
    });
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
      req.user = { id: decoded.id };
      next();
    } catch (err) {
      throw new MessageError({
        code: "ERR_UNAUTHORIZED",
        message: status[401],
        statusCode: status.UNAUTHORIZED
      });
    }
  };
};