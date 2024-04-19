# Sikora

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Sikora is a API web scrapper service which fetchs data from any website and returns it in a fancy json format.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/svnrnns/sikora.git
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Run the project:
   ```sh
   node .
   ```

## Usage

To use Sikora, follow the steps below:

Format the URL as shown in the [Endpoints](#endpoints) section. <br>
Make a request to the appropriate endpoint using your preferred HTTP client. <br>
Here's an example using curl:

```sh
curl -X GET http://localhost:3000/api/fetch/https%3A%2F%2Fopen.spotify.com%2Ftrack%2F7GJVqqE79WOl8ncT7Y4z0L
```

## Endpoints

The API has two available endpoints:

- `/api/` - Root directory indicating supported websites.
- `/api/fetch/:url` - Fetches data from the specified URL.

The **:url** parameter must be formatted as follows:

Encode the URL using `encodeURIComponent()`. <br>
Replace certain characters with their corresponding percent-encoded values (e.g., : with %3A, / with %2F). <br>
Here's an example:

```js
const nativeURL =
  "https://open.spotify.com/track/7GJVqqE79WOl8ncT7Y4z0L?si=6e9bd59704a4473a";
const encodedURL =
  "https%3A%2F%2Fopen.spotify.com%2Ftrack%2F7GJVqqE79WOl8ncT7Y4z0L";
```

Also, here's a function to convert URLs this way:

```js
function formatURL(url) {
  // Remove language code (e.g., intl-xx) if present
  url = url.replace(/\/intl-[a-z]{2}/, "");
  // Remove sesion id
  url = url.replace(/\?si=.*/, "");
  // Encode the URL
  url = encodeURIComponent(url);
  // Replace : with %3A
  url = url.replace(/:/g, "%3A");
  // Replace / with %2F
  url = url.replace(/\//g, "%2F");
  // Replace ? with %3F
  url = url.replace(/\?/g, "%3F");
  // Replace = with %3D
  url = url.replace(/=/g, "%3D");
  return url;
}
```

## Contributing

If you would like to contribute to the project, that's great! Here are a few guidelines:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/improvement`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/improvement`).
6. Create a new Pull Request.
