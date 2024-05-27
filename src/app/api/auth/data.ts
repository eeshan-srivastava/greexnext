import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const data = Array.from({ length: 100 }, (_, i) => ({
    x: new Date(Date.now() - i * 1000).toISOString(),
    y: Math.random() * 100 + 100,
  }));
  res.status(200).json(data);
};

export default handler;
