export class AppError extends Error {
  // Types
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: any, statusCode: number) {
    super(message);
    console.log(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
