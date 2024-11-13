import { JwtPayload } from 'jsonwebtoken';

export interface MyJwtPayload extends JwtPayload {
  role: string;
}