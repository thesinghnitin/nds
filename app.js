const express= require("express");
const path = require("path");
const app= express();
const bodyparser= require("body-parser")


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port= 8000;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

  const Contact = mongoose.model('Contact', contactSchema);


app.use('/static' ,express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req,res)=>{



    res.status(200).render('home.pug')
})

app.get('/contact', (req,res)=>{
    res.status(200).render('contact.pug')
})

app.post('/contact', (req,res)=>{
    var myData= new Contact(req.body);
myData.save().then(()=>{
    res.send("This item has been saved to the database")
}).catch(()=>{
    res.status(400).send("Item was not saved to the database")
});
    // res.status(200).render('contact.pug')
})


app.listen(port,()=> { 
    console.log(`The application started successfully on port ${port}`);
})