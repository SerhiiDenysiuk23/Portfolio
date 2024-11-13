import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {id} = req.query
  const imageUrl = `https://drive.google.com/uc?export=view&id=${id}`;

  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();

  res.setHeader("Content-Type", "image/jpeg");
  res.send(Buffer.from(buffer));
}