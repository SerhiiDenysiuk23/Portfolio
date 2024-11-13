import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import {MyJwtPayload} from "@/types/MyJwtPayload";

export const adminAuthMiddleware = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY!) as MyJwtPayload;
      if (decoded?.role !== 'admin') {
        throw new Error();
      }
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
};