const mongoose = require("mongoose");

async function connectToMongoDB(url)
{
    return mongoose.connect(url)
            .then(()=>console.log("MongoDB has been connected succesfully"))
            .catch((err)=>console.log("Error while connecting the MongoDB"));
}

module.exports = {
    connectToMongoDB,
}