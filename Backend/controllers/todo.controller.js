const pool = require('../db')

async function addToDo(req, res)
{
    const { notes, user_id } = req.body
    console.log(req.body);
    try {
        const result = await pool`insert into todo (notes,user_id) values (${notes},${user_id}) returning *`;
        res.status(201).json(result[0]);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

async function updateToDo(req, res)
{
    const { id } = req.params;
    const { user_id } = req.query;
    const { notes } = req.body;
    // console.log(`Update Request: ID=${id}, Notes=${notes}`);
    try {
        const result = await pool`update todo set notes = ${notes} where note_id = ${id} and user_id=${user_id} returning *`;
        console.log('Update Result:', result);

        if (result.length === 0) {
            res.status(404).json({ error: 'todo not found' })
        }
        else {

            res.status(200).json(result[0]);
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

async function fetchToDo(req, res)
{
    // const { id } = req.params;
    const { user_id } = req.query;

    // console.log(`Update Request: ID=${id}, Notes=${notes}`);
    try {
        const result = await pool`select * from todo where user_id=${+user_id}`;
        console.log('Update Result:', result);

        const sorted = result.sort((a, b) => a.note_id - b.note_id);

        if (sorted.length === 0) {
            res.status(400).json({ message: 'todo not found' })
        }
        else {

            res.status(200).json(sorted);
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};


async function deleteToDo(req, res)
{
    const { id } = req.params;
    const { user_id } = req.query;

    try {
        await pool`delete from todo where note_id=${id} and user_id=${user_id}`;
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = { addToDo, updateToDo, fetchToDo, deleteToDo }
// module.exports = { addToDo,updateToDo,fetchToDo }