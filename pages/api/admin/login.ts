import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ role: 'admin' }, process.env.ADMIN_SECRET_KEY!, { expiresIn: '1h' });
      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default login;