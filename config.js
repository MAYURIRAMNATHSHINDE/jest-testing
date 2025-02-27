const mongoose = require('mongoose');


const ConnectedToDB=async()=>{
await mongoose.connect(process.env.MONGO_URI)
console.log('MongoDB Connected')
}

module.exports={ConnectedToDB}