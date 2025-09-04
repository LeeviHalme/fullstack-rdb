import { Request } from "express";

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      token: string | undefined;
      userId: string | undefined;
    }
  }
}

interface JwtPayload {
  id: string;
  username: string;
}
