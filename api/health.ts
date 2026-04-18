// api/health.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    status: 'ok',
    app: 'skylaunch',
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV ?? 'local',
  });
}