import { databaseUrl } from '@/app/utils/databaseUrl';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = databaseUrl;

  let path = '';
  if (Array.isArray(req.query.path)) {
    path = req.query.path.join('/');
  } else if (typeof req.query.path === 'string') {
    path = req.query.path;
  }

  const url = `${baseUrl}/${path}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers as any,
      body: req.method !== 'GET' ? req.body : undefined,
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro no proxy', details: err });
  }
}
