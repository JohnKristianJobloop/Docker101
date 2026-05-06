import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hei fra TypeScript + Node.js i Docker!',
    timestamp: new Date().toISOString(),
  });
});

const server = app.listen(port, () => {
  console.log(`Server kjører på port ${port}`);
});

// Node som PID 1 i en container videresender ikke SIGTERM automatisk
process.on('SIGTERM', () => server.close(() => process.exit(0)));
