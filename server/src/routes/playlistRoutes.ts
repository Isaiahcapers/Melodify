import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const router = express.Router();
const pool = new Pool({
  // PostgreSQL connection configuration
});

// POST /api/playlists
router.post('/', async (req: Request, res: Response) => {
  const { name, artist } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO playlists (name, artist) VALUES ($1, $2) RETURNING *',
      [name, artist]
    );
    res.status(201).json(result.rows[0]); // Respond with the created playlist
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
