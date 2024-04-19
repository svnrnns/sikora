const axios = require("axios");

async function getHTML(url) {
  const { data: html } = await axios.get(url);

  return html;
}

function generateDataTemplate(url) {
  return {
    requested_url: url,
    fetched: new Date(),
    status: "FETCHING",
  };
}

function getMetatag($, name) {
  return (
    $(`meta[name="${name}"]`).attr("content") ||
    $(`meta[property="og:${name}"]`).attr("content") ||
    $(`meta[property="twitter:${name}"]`).attr("content") ||
    $(`meta[name="music:${name}"]`).attr("content")
  );
}

module.exports = { generateDataTemplate, getMetatag, getHTML };
