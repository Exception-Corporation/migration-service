const dotenv = require("dotenv");
const Fastify = require("fastify");
const WebSocket = require("@fastify/websocket");

dotenv.config({});

// eslint-disable-next-line no-undef
const port = Number(process.env.PORT) + 1;
(async () => {
  const app = Fastify({ logger: false, trustProxy: true });

  app.register(require("@fastify/cors"));
  app.register(WebSocket, {
    options: {
      maxPayload: 1048576,
      clientTracking: true,
    },
  });

  //Websocket
  app.register(async (_fastify) => {
    app.get("/ws", { websocket: true }, (connection, _req) => {
      connection.socket.on("message", (message) => {
        console.info("[WebSocket] Message: " + message.toString());

        const clients = app.websocketServer.clients;

        clients.forEach((client) => {
          if (client !== connection.socket) {
            client.send(message);
          }
        });
      });
    });
  });

  await app.ready();

  app.listen({ port: port, host: "0.0.0.0" }, () => {
    console.info(`WebSocket Running on: [ws://localhost:${port}/ws]`);
  });
})();
