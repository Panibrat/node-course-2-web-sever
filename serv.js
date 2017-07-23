const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
})

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        console.log('Cannot write the file server.log', error);
    });
    next();
});

/*app.use((req, res, next) => {
    res.render('error.hbs');
});*/

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
    res.render('home.hbs', {
    welcome: 'Hello and Welcome!!',
    pageTitle: 'Home page'
});
});
app.get('/about', (req, res) => {
    res.render('about.hbs',{
    pageTitle: 'About page'
    });
});
app.get('/projects', (req, res) => {
    res.render('projects.hbs',{
    pageTitle: 'Projects page'
    });
});
app.get('/bad', (req, res) => {
    res.send({
    errorMessage: 'Warning!!! go to another site!'
    });
});
app.listen(port, ()=> {
    console.log(`Server is runing on port ${port}`);
});

