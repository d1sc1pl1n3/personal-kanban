import pool from '../../../../lib/db';

export default async function handler(req, res) {
    const { id } = req.query; // Extract column ID from the URL

    if (req.method === 'GET') {
        try {
            const result = await pool.query(
                'SELECT * FROM tasks WHERE column_id = $1 ORDER BY position ASC',
                [id]
            );
            res.status(200).json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch tasks' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}