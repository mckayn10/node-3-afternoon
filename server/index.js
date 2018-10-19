require('dotenv').config();
const checkForSession = require('./middlewares/checkForSession');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');


const {SERVER_PORT, SESSION_SECRET} = process.env;

app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))


app.use( checkForSession );
app.use( express.static( `${__dirname}/build` ) );

//Swag
app.get('/api/swag', swag_controller.read);

//Auth
app.get('/api/user', auth_controller.getUser);
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout); 

//Cart
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

//Search
app.get('/api/search', search_controller.search);


app.listen(SERVER_PORT, () => {
    console.log(`server listening on port ${SERVER_PORT}`)
})


