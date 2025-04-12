const mongoose = require('mongoose')

const connectDB = async ()=>{
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Db connected successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connectDB };