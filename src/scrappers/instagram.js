const data = require("../services/data.js");
const cheerio = require("cheerio");

async function profile(url, res) {
  try {
    const apiResponse = await fetchProfileData(url);
    res.status(200).send(apiResponse);
  } catch (error) {
    data.processError(error, url, res);
  }
}

async function fetchProfileData(url) {
  const startFetching = Date.now();

  const apiResponse = data.generateDataTemplate(url);
  const html = await data.getHTML(url);
  const $ = cheerio.load(html);

  const avatar = data.getMetatag($, "image");
  const titleData = data.getMetatag($, "title");
  const { accountName, username } = extractDataFromTitle(titleData);
  const descriptionData = data.getMetatag($, "description");
  const follows = extractFollowsFromDescription(descriptionData);

  apiResponse.fetched = data.getFetchingTime(startFetching);
  apiResponse.data = {
    avatar,
    name: accountName,
    username,
    followers: follows[0],
    following: follows[1],
    posts: follows[2],
  };
  apiResponse.status = "COMPLETED";

  return apiResponse;
}

module.exports = { profile };

function extractDataFromTitle(str) {
  let startIndex = str.indexOf("(") + 1;
  let endIndex = str.indexOf(")");
  let accountName = str.substring(0, startIndex - 2);
  let username = str.substring(startIndex, endIndex);

  return {
    accountName: accountName,
    username: username,
  };
}

function extractFollowsFromDescription(str) {
  return str.match(/\d+/g).map(Number);
}
