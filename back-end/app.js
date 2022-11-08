const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user')
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

mongoose
    .connect(
        'mongodb+srv://Guillermo:Mutiara-14@cluster0.0vmcqow.mongodb.net/Shop-Side-Project?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Guillermo',
                    email: 'Guillermo@test.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    });