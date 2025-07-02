const express = require('express')

const app = express();

app.use("/",(err,req,res,next)=>{
    if (err) {
        // Log your error message
        res.status(500).send("something went wrong!!")
    }
})

app.get('/getUserData', (req,res) => {
    // try{
        // logic of DB call and get user data

        throw new Error("error found")
        res.send("User Data Sent");
    // }catch (err){
    //     res.status(500).send("Some Error contact support team")
    // }
})


app.listen(7777, ()=>{
    console.log('Server is successfully listening on port 7777...')
}) 