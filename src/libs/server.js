let express = require("express");
let app = express();

let port = process.env.PORT || 8000;

module.exports = () => {
  app.listen(port, () => console.log(`HTTP server run in port ${port}`));
};
