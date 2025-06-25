import { Request,Response } from 'express';

declare global {
  namespace Express {
    export interface Request {
      user?: { id: number }
    }
    export interface Response {
      success: (data?: any, meta?: any, message?: string, statusCode?: number) => void
    }
  }
}