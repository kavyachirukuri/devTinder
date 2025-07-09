const express = require('express')
const connectDB =  require("./config/database")
const User = require('./models/user')

const app = express();

app.use(express.json())

app.post('/signup', async (req,res)=>{
    const user = new User(req.body);

    try {
        await user.save()
        res.send('User added successfully!')
    } catch (err) {
        res.status(400).send('Error saving the user:' + err.message);
    }
})

// Get user by email
app.get('/user', async (req,res) => {
    const userEmail = req.body.emailId;

    try {
        const users = await User.find({emailId: userEmail})
        if (users.length === 0){
            res.status(404).send('User not found');
        } else {
          res.send(users)
        }
    } catch (err) {
        res.status(400).send("Something went wrong!")
    }
})

//Get user by Id
app.get('/user/:id', async (req,res)=>{
    const {id} = req.params;

    try {
        const user = await User.findById(id);
        res.send(user);
    } catch (err) {
        res.status(500).send(err.message)
    }
})

// Get all users
app.get('/feed', async (req,res) => {
    // const userEmail = req.body.emailId;

    try {
        const users = await User.find({})
        if (users.length === 0){
            res.status(404).send('Users not found');
        } else {
          res.send(users)
        }
    } catch (err) {
        res.status(400).send("Something went wrong!")
    }
})

// delete api
app.delete("/user", async (req,res)=>{
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId)

        res.send('User deleted successfully')
    } catch (err){
        res.status(400).send("Something went wrong")
    }
})

// Update data of the user
app.patch("/user", async (req,res) => {
    const userId = req.body.userId
    const emailId = req.body.emailId;
    const data = req.body
console.log('userId',userId)
    try {
        let updated;

        if (userId){
          updated =  await User.findByIdAndUpdate({_id: userId}, data,{
            returnDocument: 'after',
            runValidators: true
          })

          res.send("User updated successfully")
        } else if (emailId){
            updated = await User.findOneAndUpdate({emailId},data)
        } else {
            return res.status(400).send("Provide either userId or emailId")
        }

        if (!updated) {
            return res.status(404).send("User not found");
        }
        res.send('User update successfully')
    } catch (err) {
        res.status(400).send("UPDATE FAILED:" + err.message)
    }
})

connectDB()
.then(()=>{
    console.log('Database connection established...')
    app.listen(7777, ()=>{
        console.log('Server is successfully listening on port 7777...')
    }) 
})
.catch((err)=>{
    console.error("Database cannot be connected!!")
})


