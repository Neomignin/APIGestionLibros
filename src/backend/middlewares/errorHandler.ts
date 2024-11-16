import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../types/CustomError.js';

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[Error] ${new Date().toISOString()}:`, {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method
  });

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Error interno del servidor'
      : error.message,
    details: process.env.NODE_ENV !== 'production' ? error.details : undefined
  });
};