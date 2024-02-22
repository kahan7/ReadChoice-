const https = require("https");

function pingServer() {
  const options = {
    hostname: "readchoiceapis2.onrender.com",
    port: 443,
    path: "/",
    method: "GET",
  };

  const req = https.request(options, (res) => {
    console.log(`Server pinged. Status code: ${res.statusCode}`);
  });

  req.on("error", (error) => {
    console.error(`Error pinging server: ${error.message}`);
  });

  req.end();
}

module.exports = {
  pingServer,
};
