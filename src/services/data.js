const axios = require("axios");

async function getHTML(url) {
  const { data: html } = await axios.get(url);

  return html;
}

function generateDataTemplate(url) {
  return {
    requested_url: url,
    fetched: new Date(),
    fetched_in: null,
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

function getFetchingTime(start) {
  const end = Date.now();
  return end - start;
}

function processError(error, url, res) {
  res.status(error.response.status).send({
    status: error.response.status,
    error: error.response.statusText,
    url: url,
  });
}

function formattedToRegularNumber(str) {
  const multiplierMap = {
    K: 1000,
    M: 1000000,
    // Add more multipliers if needed, e.g., 'B' for billion
  };

  const regex = /(\d{1,3}(?:,\d{3})*\.?\d*)([KMB])?/i;
  const matches = regex.exec(str);

  if (!matches) return null;

  const [, numberPart, multiplier] = matches;
  const strippedNumberPart = numberPart.replace(/,/g, "");

  if (multiplier) {
    const multiplierValue = multiplierMap[multiplier.toUpperCase()];
    return parseFloat(strippedNumberPart) * multiplierValue;
  } else {
    return parseFloat(strippedNumberPart);
  }
}

module.exports = {
  generateDataTemplate,
  getMetatag,
  getHTML,
  getFetchingTime,
  processError,
  formattedToRegularNumber,
};
