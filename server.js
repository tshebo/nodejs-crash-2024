import http from "http";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url"; // Correct import for fileURLToPath
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000; // Default to port 3000 if not specified
const __filename = fileURLToPath(import.meta.url); // Corrected function name
const __dirname = path.dirname(__filename);

console.log(__dirname, __filename);

export const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      let filePath;
      if (req.url === "/") {
        filePath = path.join(__dirname, "public", "index.html");
      } else if (req.url === "/about") {
        filePath = path.join(__dirname, "public", "about.html");
      } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>Not Found</h1>");
        return; // Exit the request handler after sending the response
      }

      const data = await fs.readFile(filePath);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data); // Write the data and end the response

    } else {
      res.writeHead(405, { "Content-Type": "text/html" });
      res.end("<h1>Method Not Allowed</h1>");
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end(`<h1>Server Request Error: ${error.message}</h1>`);
  }
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
