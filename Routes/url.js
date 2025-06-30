const express = require("express");
const {handleCreateNewUrl,handleGetAnalyticsData} = require("../Controller/url");
const router = express.Router();

router.post("/",handleCreateNewUrl);

router.get("/analytics/:shortId",handleGetAnalyticsData);

module.exports = {
    router,
}