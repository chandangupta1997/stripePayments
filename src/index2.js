const express = require('express') 
const bodyparser = require('body-parser') 
const path = require('path') 
const app = express() 
// **********************************stripe thing ***************************
var Publishable_Key = "pk_test_51LFeqNSAr6JYe3BwGV4YaSxsSgXJDhpNJvU7hM6CwfLlh1t81VO6qVIGJCP8xZAYYk4Ip6oqU14z56BZieA2k0AY00FKKCzXws"

var Secret_Key = "sk_test_51LFeqNSAr6JYe3Bw26UjDdiXGA9Y9WpdzJSfZ7EWrIWoYLZKcjHnS9l5lldY3xiWuhEqUzITQXh87JWv4IjQsEyu00Av1DlEjN"

const stripe = require('stripe')(Secret_Key)  // passing the secret key as well 

//******************************************************* */

const port = process.env.PORT || 3000 

app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 

// View Engine Setup 
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

app.get('/', function(req, res){ 
    res.render('Home', { 
    key: Publishable_Key 
    }) 
}) 
// app.post so that user can send data to us 

//*******************************stripe post ******************************* */
app.post('/payment', function(req, res){ 

    // Moreover you can take more details from user 
    // like Address, Name, etc from form 

    // stripe method of creating customers 
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: 'Gautam Sharma',  // yha post request se jo aaega wo likhenge  schema type thing 
        address: { 
            line1: 'TC 9/4 Old MES colony', 
            postal_code: '110092', 
            city: 'New Delhi', 
            state: 'Delhi', 
            country: 'India', 
        } 
    }) 
    .then((customer) => { 

        return stripe.charges.create({ 
            amount: 7000,    // Charing Rs 25  or  whatever you want  
            description: 'Web Development Product', 
            currency: 'USD', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        res.send("Success") // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)    // If some error occurs 
    }); 
}) 


//************************************************************************************* */

app.listen(port, function(error){ 
    if(error) throw error 
    console.log("Server created Successfully") 
})