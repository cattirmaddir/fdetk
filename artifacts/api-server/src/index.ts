import http from "node:http";
import https from "node:https";
import { createBareServer } from "@tomphttp/bare-server-node";
import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const server = http.createServer();

server.keepAliveTimeout = 5_000;
server.headersTimeout = 10_000;
server.requestTimeout = 30_000;

const bareServer = createBareServer("/bare/", {
  httpAgent: new http.Agent({
    keepAlive: true,
    maxSockets: 128,
    maxFreeSockets: 32,
    timeout: 30_000,
  }),
  httpsAgent: new https.Agent({
    keepAlive: true,
    maxSockets: 128,
    maxFreeSockets: 32,
    timeout: 30_000,
  }),
  connectionLimiter: {
    maxConnectionsPerIP: 100_000,
    windowDuration: 60,
    blockDuration: 1,
  },
});

server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
    return;
  }

  app(req, res);
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
    return;
  }

  socket.end();
});

server.listen(port, () => {
  logger.info({ port }, "Server listening");
});

server.on("error", (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }
});
