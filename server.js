const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//MiddleWare for Loging

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log(":unable to appennd");
        }
    })
    next(); 
})

//

app.use((req,res,next) => {
    
    res.render('fix.hbs')
    
    // next();
})


hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase(); 
})


app.get('/', (req, res) =>{
    // res.send("<h1>Hello Expresssdadas</h1>");
    res.render('home.hbs',{
        name : "Rishav",
        message: "Welcome to my website brother"
        
    });
});

  
app.get('/about',(req, res) =>{
    res.render('about',{
        pageTitle: "About Page",
        
    });
});

app.get("/bad", (req, res)=>{   
    res.send({
        errorMessage : "Not Found",
        errorMessage2 : "pcika",
        
    });
});

app.listen(3000, () =>{
    console.log("server is running")
});