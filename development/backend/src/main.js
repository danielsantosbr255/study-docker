import http from "http";
import express from "express";

const server = http.createServer();

server.on("request", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/") {
    res.end(JSON.stringify({ message: "Hello, world!" }));
    return;
  }

  if (req.url === "/health") {
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Not found" }));
});

server.listen(3000, () => console.log("🚀 server running"));
