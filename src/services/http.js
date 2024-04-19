const spotify = require("../scrappers/spotify.js");

const spotifyURL = "open.spotify.com";

function process(req, res) {
  const { url } = req.params;

  if (url.includes(spotifyURL) && url.includes("/track/"))
    spotify.track(url, res);
}

module.exports = { process };
