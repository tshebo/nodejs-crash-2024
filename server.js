import http from "http";
import dontenv from "dotenv";

dontenv.config();

const PORT = process.env.PORT;

export const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>hello world</h1>");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>about</h1>");
  }
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>page not found</h1>");
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>hello world</h1>");
});

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
