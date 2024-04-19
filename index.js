const http = require("./src/services/http");
const cors = require("cors");
const app = require("express")();
const PORT = 8080;

app.use(cors());

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});

app.get("/api/", (req, res) => {
  res.status(200).send({
    supported_websites: {
      spotify: ["tracks"],
    },
  });
});

app.get("/api/fetch/:url", (req, res) => {
  http.process(req, res);
});
