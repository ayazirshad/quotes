const fs = require("fs");
const http = require("http");
const requests = require("requests");

const homeFile = fs.readFileSync("./index.html", "utf-8");

const insertData = (file, qoutes) => {
  let newFile = file.replace("{words}", qoutes[0].text);
  newFile = newFile.replace("{author}", qoutes[0].author);
  return newFile;
};

const server = http.createServer((req, res) => {
  console.log(`request recieved ${req.url}`);
  if (req.url == "/") {
    console.log("request is beig made");
    requests("https://type.fit/api/quotes")
      .on("data", (chunk) => {
        const objData = JSON.parse(chunk);
        // console.log(objData);
        const realTimeData = insertData(homeFile, objData);
        res.write(realTimeData);
        console.log(realTimeData);
        console.log("data has been sent");
      })
      .on("end", (err) => {
        console.log("end");
      });
  } else {
    res.end("page not found");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("listening to port");
});
