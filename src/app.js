const express = require('express')

const app = express();

app.get("/user",(req,res,next)=>{
    console.log('Handling the route user!!')
    next()
},
    (req,res,next)=>{
        console.log('Handling the route user 2')
        res.send('2nd response')
    }
)

app.listen(7777, ()=>{
    console.log('Server is successfully listening on port 7777...')
}) 