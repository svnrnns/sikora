const spotify = require("../scrappers/spotify.js");
const instagram = require("../scrappers/instagram.js");
const any = require("../scrappers/any.js");

const spotifyURL = "open.spotify.com";
const instagramURL = "instagram.com";

function process(req, res) {
  const { url } = req.params;

  if (url.includes(spotifyURL) && url.includes("/track/")) {
    spotify.track(url, res);
    return;
  }

  if (url.includes(instagramURL)) {
    instagram.profile(url, res);
    return;
  }

  any.handle(url, res);
}

module.exports = { process };
