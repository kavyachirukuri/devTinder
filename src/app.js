const express = require('express')

const app = express();

const { adminAuth , userAuth} = require("./middlewares/auth")
//GET /users ==> middleware chain ==> request handler

app.use('/admin', adminAuth)

app.get('/admin',(req,res,next)=>{
    console.log('Handling /user route');
    next();
}, 
(req,res,next)=>{
    res.send("1st Route Handler")
},
(req,res,next) => {
    res.send('2nd Route Handler')
}
)

app.get('/user', userAuth, (req,res,next) => {
    res.send("User Data Sent");
})

app.post('/user/login',(req,res)=>{
    res.send('user logged in successfully')
})

app.listen(7777, ()=>{
    console.log('Server is successfully listening on port 7777...')
}) 