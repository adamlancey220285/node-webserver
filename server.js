const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// add port to var if heroku then uses first if local then uses 3000
const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

// add middleware always use app.use for this

// make a logger middleware
app.use((req,res,next)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    // create a log file
    fs.appendFile('server.log',log + '\n', (error)=>{
        if(error){
            console.log('Unable to apend to server log');
        }
    });
    next();
});

// maintenance page middleware
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance!'
//     })
// });

// public static directory middleware
app.use(express.static(__dirname + '/public'));


// register partial helpers
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

// register handlers for httpget request
app.get('/', (req, res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home page',
        welcomeMessage: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis voluptate, exercitationem nam tempora delectus molestias sint quam et dolore quae quidem, perferendis veritatis. Iste repellendus voluptate praesentium quisquam sint iure!'
    });
});
app.get('/about', (req,res)=>{
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/projects', (req,res)=>{
    res.render('projects.hbs',{
        pageTitle : 'Projects Page'
    });
});

app.get('/bad', (req,res)=>{
    res.send({
        errorMessage: 'this was a bad request'
    });
});
// start listening and bind to port
app.listen(port, () =>{
    console.log(`server is up on port ${port}`);
});
