export default function handler(
    request: Request,
  ): Response {
    const body = {
      status: 'ok',
      app: 'skylaunch',
      timestamp: new Date().toISOString(),
      environment: process.env.VERCEL_ENV ?? 'local'
    };

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    });
  }