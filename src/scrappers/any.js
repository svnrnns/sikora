const data = require("../services/data.js");
const cheerio = require("cheerio");
const { URL } = require("url");

async function handle(url, res) {
  try {
    const apiResponse = await fetchGeneralData(url);
    res.status(200).send(apiResponse);
  } catch (error) {
    data.processError(error, url, res);
  }
}

async function fetchGeneralData(url) {
  const startFetching = Date.now();

  const apiResponse = data.generateDataTemplate(url);
  const html = await data.getHTML(url);
  const $ = cheerio.load(html);

  const title = $("title").text();
  const description = $('meta[name="description"]').attr("content");
  const imageUrl = $('meta[property="og:image"]').attr("content");
  const faviconLink = $('link[rel="icon"], link[rel="shortcut icon"]')
    .first()
    .attr("href");
  const touchIconLink = $('link[rel="apple-touch-icon"]').attr("href");

  const faviconUrl = new URL(faviconLink, url).toString();
  const touchIconUrl = new URL(touchIconLink, url).toString();
  const s2FaviconUrl =
    "https://s2.googleusercontent.com/s2/favicons?domain_url=" + url;

  apiResponse.fetched_in = data.getFetchingTime(startFetching);
  apiResponse.data = {
    title,
    description,
    image: imageUrl,
    favicon: faviconUrl,
    touchicon: touchIconUrl,
    s2_favicon: s2FaviconUrl,
  };
  apiResponse.status = "COMPLETED";

  return apiResponse;
}

module.exports = { handle };
