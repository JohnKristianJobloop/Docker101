const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id         SERIAL PRIMARY KEY,
      text       TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  console.log('Database klar.');
}

app.get('/messages', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
  res.json(rows);
});

app.post('/messages', async (req, res) => {
  const { text } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO messages (text) VALUES ($1) RETURNING *',
    [text]
  );
  res.status(201).json(rows[0]);
});

init().then(() => {
  const server = app.listen(port, () => console.log(`Backend kjører på port ${port}`));
  // Node som PID 1 i en container videresender ikke SIGTERM automatisk
  process.on('SIGTERM', () => server.close(() => process.exit(0)));
});
