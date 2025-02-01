import pool from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const result = await pool.query('SELECT * FROM tasks');
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ message: 'Failed to fetch tasks' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}