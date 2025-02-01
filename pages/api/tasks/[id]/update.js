import pool from '../../../../lib/db';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'PUT') {
        const { position, column_id } = req.body;

        try {
            const result = await pool.query(
                'UPDATE tasks SET position = $1, column_id = $2 WHERE id = $3 RETURNING *',
                [position, column_id, id]
            );
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to update task position' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}