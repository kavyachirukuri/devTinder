const express = require('express')
const connectDB =  require("./config/database")
const User = require('./models/user')
const {validateSignUpData} = require('./utils/validation');
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")

const app = express();

app.use(express.json())
app.use(cookieParser())

app.post('/signup', async (req,res)=>{

    try {
        // Validation of data
        validateSignUpData(req)
        const {firstName, lastName, emailId, password} = req.body;

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password,10)

        // Creating a new instance of the User model
        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        })

        await user.save()
        res.send('User added successfully!')
    } catch (err) {
        res.status(400).send('Error:' + err.message);
    }
})

app.post('/login', async (req,res)=>{
    try {
        const {emailId,password} = req.body;

        const user = await User.findOne({emailId: emailId});

        if (!user){
            throw new Error("Invalid credentials")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid){
            // Create a JWT Token
            const token = await jwt.sign({_id:user._id},"DEV@Tinder$790")
            // Add the token to cookie and send the response back to the user
            res.cookie("token", token)
            res.send("Login Successful!!!");
        } else {
            throw new Error("Invalid credentials");
        }
    } catch(err) {
        res.status(400).send("ERROR : " + err.message)
    }  
})

app.get("/profile", async (req,res)=>{
    try {
        const cookies = req.cookies;
        const {token} = cookies;
        if (!token){
            throw new Error("Invalid Token")
        }

        // Validate my token
        const decodedMessage = jwt.verify(token,"DEV@Tinder$790")
        const {_id} = decodedMessage

        const user = await User.findById(_id)
        if(!user){
            throw new Error("User does not exist")
        }
        res.send(user)
    } catch (err) {
        res.status(400).send('ERROR: ' + err.message)
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
app.patch("/user/:userId", async (req,res) => {
    const userId = req.params?.userId
    const emailId = req.body.emailId;
    const data = req.body
   
    try {
        const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"]
        const isUpdateAllowed = Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k))

        if (!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        if (data?.skills.length > 10) {
            throw new Error("Skills cannot be more than 10")
        }
        let updated;

        if (userId){
          updated =  await User.findByIdAndUpdate({_id: userId}, data,{
            returnDocument: 'after',
            runValidators: true
          })

        if (!updated) {
            return res.status(404).send("User not found");
        }

          return res.send("User updated successfully")
        } else if (emailId){
            updated = await User.findOneAndUpdate({ emailId }, data, {
                returnDocument: 'after',
                runValidators: true
            });
            if (!updated) {
                return res.status(404).send("User not found");
            }

            return res.send("User updated successfully");
        } else {
            return res.status(400).send("Provide either userId or emailId")
        }

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


