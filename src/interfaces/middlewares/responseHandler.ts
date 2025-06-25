import { Request, Response, NextFunction } from 'express';
import customError from '../../utils/error/CustomError';

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(error instanceof customError){
    res.status(error.statusCode).json({
      status: false,
      message: error.message,
      code: error.code,
    });
  }else{
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      code: 500,
    });
  }
};

export const successHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.success = (data, meta, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
      status: true,
      message,
      data,
      meta
    });
  };
  next();
};