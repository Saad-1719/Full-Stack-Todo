const pool = require("../db")

async function addUser(req, res)
{
    const { name, email, password } = req.body
    try {

        const allMailsResults = await pool`select email from users`;
        const allMail=allMailsResults.map(row=>row.email)
        // console.log(allMail);
        const isFound = allMail.find(existingEmail=>existingEmail===email)
        if (isFound)
        {
            res.status(400).json({success:false,userAdded:false})
        }
        else {
            
            const result = await pool`insert into users (name, email,password) values (${name},${email},${password})`
            if (result.length === 0) {
                res.status(200).json({ success: true, userAdded: true })
            }
            else {
    
                res.status(200).json({ success: true, userAdded: false })
            }
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
async function verifyUser(req, res)
{
    const { email, password } = req.body
    try {
        const result = await pool`select * from users where email=${email} and password=${password}`
        if (result.length > 0) {

            res.status(200).json(result[0])
            console.log(result[0]);
        }
        else {
            res.status(404).json({ error: "user not Found" })

        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

async function validateUser(req, res)
{
    const { user_id } = req.body;
    try {
        const result = await pool`select * from users where id=${+user_id}`;

        console.log("RESULT:", result);
        if (result.length === 0) {
            res.status(200).json({ success: true, userExists: false })
        }
        else {

            res.status(200).json({ success: true, userExists: true })
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }


}
module.exports = { addUser, verifyUser, validateUser }