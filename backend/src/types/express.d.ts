import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: {
      id: string; // or number, depending on your auth
      email?: string;
      role?: string;
    };
  }
}