const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// middleware

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

app.use('/maintenance', (req, res) => {
  res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Welcome to the Home Page',
    someText: 'What can we do for you ?',
    currentYear: new Date().getFullYear()
  });
});

// app.get('/api', (req, res) => {
//   res.send({
//     name: 'Rafael',
//     likes: [
//       'Biking',
//       'Cipher'
//     ]
//     });
//   });

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
     errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
