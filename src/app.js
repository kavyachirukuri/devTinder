const express = require('express')

const app = express();

// this will only handle GET call to /user
app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params)
    res.send({
        firstname: "Tejaswi",
        lastname: "Chirukuri"
    })
})

app.listen(7777, ()=>{
    console.log('Server is successfully listening on port 7777...')
}) 