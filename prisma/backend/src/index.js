const http = require("http");
const { prisma } = require("./client");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/" && req.method === "GET") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Hello World!" }));
    return;
  }

  if (req.url === "/users" && req.method === "GET") {
    const getAllUsers = async () => {
      const users = await prisma.user.findMany();
      res.statusCode = 200;
      res.end(JSON.stringify(users));
    };
    getAllUsers();
    return;
  }

  if (req.url === "/users" && req.method === "POST") {
    const createUser = async () => {
      const user = await prisma.user.create({ data: { name: "Jane Doe", email: "jane@example.com" } });
      res.statusCode = 201;
      res.end(JSON.stringify(user));
    };
    createUser();
    return;
  }

  res.end(JSON.stringify({ message: "Not Found" }));
});

server.listen(process.env.PORT, () => {
  console.log("Server running at http://localhost:3000");
});
