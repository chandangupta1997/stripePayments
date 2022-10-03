

const express = require('express')

const bodyParser = require(' body-parser')

const app  = express()

const stripe = require('stripe')

const Publishable_key = "pk_test_51LFeqNSAr6JYe3BwGV4YaSxsSgXJDhpNJvU7hM6CwfLlh1t81VO6qVIGJCP8xZAYYk4Ip6oqU14z56BZieA2k0AY00FKKCzXws"


const Secret_key = "sk_test_51LFeqNSAr6JYe3Bw26UjDdiXGA9Y9WpdzJSfZ7EWrIWoYLZKcjHnS9l5lldY3xiWuhEqUzITQXh87JWv4IjQsEyu00Av1DlEjN"

// something related to ejs 
app.set("view engine","ejs ")



const PORT = process.env.PORT || 3000


app.listen(PORT, (req,res)=>{
    console.log(    ` app is running on${PORT}`)
})




// it will be rendered through the home page  and key will be brought here 
app.get("/",(req,res)=>{
    res.render('home',{key:Publishable_key})
})