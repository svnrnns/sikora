const data = require("../services/data.js");
const cheerio = require("cheerio");

async function track(url, res) {
  try {
    const apiResponse = await fetchTrackData(url);
    res.status(200).send(apiResponse);
  } catch (error) {
    console.error("Error processing track:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

async function fetchTrackData(url) {
  const startFetching = Date.now();

  const apiResponse = data.generateDataTemplate(url);
  const html = await data.getHTML(url);
  const $ = cheerio.load(html);

  const album = data.getMetatag($, "album");
  const releaseDate = data.getMetatag($, "release_date");
  const durationInMinutes = data.getMetatag($, "duration");
  const artists = data.getMetatag($, "musician_description").split(", ");
  const title = data.getMetatag($, "title");
  const cover = data.getMetatag($, "image");
  const audioPreview = data.getMetatag($, "audio");

  apiResponse.fetched = data.getFetchingTime(startFetching);
  apiResponse.data = {
    album,
    release_date: releaseDate,
    duration: durationInMinutes,
    artists,
    title,
    cover,
    audio_preview: audioPreview,
  };
  apiResponse.status = "COMPLETED";

  return apiResponse;
}

module.exports = { track };
