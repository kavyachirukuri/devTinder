const express = require('express')

const app = express();


app.get('/getUserData', (req,res) => {
    // logic of DB call and get user data
    throw new Error("error found")
    res.send("User Data Sent");
})

app.use("/",(err,req,res,next)=>{
    if (err) {
        // Log your error message
        res.status(500).send("something went wrong!!")
    }
})

app.listen(7777, ()=>{
    console.log('Server is successfully listening on port 7777...')
}) 