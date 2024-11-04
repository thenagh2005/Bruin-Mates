const mongoose = require('mongoose');
async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_URL);
        console.log('Connected to DB');
    } catch(error) {
        console.log(error);
        throw new Error("Could not connect to MongoDB");
    }
}

async function disconnectFromDB(){
    try {
        await mongoose.disconnect();
    } catch(error) {
        console.log(error);
        throw new Error("Could not disconnect from MongoDB");
    }
}

module.exports =  {connectToDB, disconnectFromDB};