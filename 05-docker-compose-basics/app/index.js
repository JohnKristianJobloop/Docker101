import express from 'express';
import Redis from 'ioredis';

const app = express();
const port = 3000;

// Tjenestenavnet i docker-compose.yml brukes som hostname
const redis = new Redis({ host: 'redis', port: 6379 });

app.get('/', async (req, res) => {
  const visits = await redis.incr('visit-counter');
  res.json({
    message: 'Hei fra Node.js + Redis!',
    visits: Number(visits),
  });
});

const server = app.listen(port, () => {
  console.log(`Server kjører på port ${port}`);
});

// Node som PID 1 i en container videresender ikke SIGTERM automatisk
process.on('SIGTERM', () => server.close(() => process.exit(0)));
