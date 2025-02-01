import pool from '../../../../lib/db';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            const result = await pool.query(
                'DELETE FROM tasks WHERE id = $1 RETURNING *',
                [id]
            );
            res.status(200).json({ message: 'Task deleted successfully', task: result.rows[0] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to delete task' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}