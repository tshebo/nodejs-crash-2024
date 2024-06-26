import { createServer } from "http";
import env from "dotenv";

env.config();

const PORT = process.env.PORT || 3000;

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "Jeff Boe" },
  { id: 4, name: "Dohn Joe" },
];

// Middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// JSON Middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

const getUserByIdHandler = (req, res) => {
  const id = req.url.split("/")[3];
  const user = users.find((user) => user.id === parseInt(id));

  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "User not found" }));
  }
  res.end();
};

const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Not Found" }));
  res.end();
};

const server = createServer((req, res) => {
  try {
    logger(req, res, () => {
      jsonMiddleware(req, res, () => {
        if (req.method === "GET" && req.url === "/api/users") {
          getUsersHandler(req, res);
        } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
          getUserByIdHandler(req, res);
        } else {
          notFoundHandler(req, res);
        }
      });
    });
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end(`<h1>Server Request Error: ${error.message}</h1>`);
  }
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
