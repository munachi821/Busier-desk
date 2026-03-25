// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { auth } from './auth';

@Injectable()
export class AuthService {
  readonly instance = auth;
}