import pool from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { title, description, column_id, position } = req.body;

        try {
            const result = await pool.query(
                'INSERT INTO tasks (title, description, column_id, position) VALUES ($1, $2, $3, $4) RETURNING *',
                [title, description, column_id, position]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to create task' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
