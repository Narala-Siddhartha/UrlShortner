const shortid = require("shortid");
const URL = require("../Model/url");

async function handleCreateNewUrl(request,response)
{
    console.log("Request Body:",request.body);
    const body = request.body;
    if(body==undefined || !body.url) return response.status(400).json({"error":"URL is required"});

    const shortID = shortid();
    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitedHistory : [],
    });

    return response.status(201).json({shortURL : shortID});
}

async function handleGetAnalyticsData(request,response)
{
    const shortId = request.params.shortId;
    const result = await URL.findOne({shortId});
    console.log("Analysis:",result);
    return response.status(200).json({
        totalClicks : result.visitedHistory.length,
        analytics : result.visitedHistory,
    });

}

module.exports = {
    handleCreateNewUrl,
    handleGetAnalyticsData,
}