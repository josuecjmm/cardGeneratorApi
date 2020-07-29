const express = require('express');
const path = require('path');

const app = express();

const privateRoutes = require('./routes/private.routes');

// Parse json response
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve other pages
app.use(privateRoutes.routes);

// Serve start page
app.get('/start', (req, res, next) => {
    res.status(200).send({
        message: 'hello world',
        cards: cards
    })
});

app.listen(3002);
