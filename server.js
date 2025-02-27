const express = require('express');
const { ConnectedToDB } = require('./config');
require('dotenv').config();
const { userRoute } = require('./route/user.route');
const { todoRoute } = require('./route/todo.route');


const app = express();

app.use(express.json());
app.use('/user', userRoute);
app.use('/todo', todoRoute);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    ConnectedToDB()
    console.log(`Server running on port ${PORT}`)
}
   
);
