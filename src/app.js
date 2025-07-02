const express = require('express')

const app = express();

app.use("/user",(req,res)=>{
    res.send("HAHAHAHAHA")
})

// this will only handle GET call to /user
app.get("/user",(req,res)=>{
    res.send({
        firstname: "Tejaswi",
        lastname: "Chirukuri"
    })
})

app.post("/user", (req,res)=>{
    // saving data to DB
    res.send('Data successfully saved to the database!')
})

app.delete("/user", (req,res)=>{
    res.send("Deleted successfully!")
})

// this will match all the http method API call to /test
app.use("/test", (req,res)=>{
    res.send("Hello from the server!")
})

app.listen(7777, ()=>{
    console.log('Server is successfully listening on port 7777...')
}) 