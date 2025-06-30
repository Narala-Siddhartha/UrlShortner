const express = require("express");
const {connectToMongoDB} = require("./connection");
const {router} = require("./Routes/url")
const URL = require("./Model/url");

const app = express();
const PORT = 3000;

//Create a Server At the port specified
app.listen(PORT,()=>console.log(`Server Listening at Port:${PORT}`));

//Setting up Mongo DB
connectToMongoDB("mongodb://127.0.0.1:27017/url-shortner");

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routing
app.use("/url",router);
app.use("/:shortId",async (request,response)=>{
    const shortId = request.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push :
            {
                visitedHistory:{timestamp : Date.now(),},
            }
        }
    );

    return response.redirect(entry.redirectURL);
})

