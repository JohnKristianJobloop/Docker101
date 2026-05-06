const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hei fra Node.js i Docker!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

const server = app.listen(port, () => {
  console.log(`Server kjører på port ${port}`);
});

// Node som PID 1 i en container videresender ikke SIGTERM automatisk
process.on('SIGTERM', () => server.close(() => process.exit(0)));
