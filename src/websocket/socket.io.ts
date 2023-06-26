import { Server as SocketServer } from "socket.io";

export class WebSocket {
  private io: SocketServer;

  constructor(private server: any) {
    this.io = new SocketServer(this.server, {
      cors: {
        origin: "*",
      },
      allowEIO3: true,
      transports: ["polling", "websocket"],
    });
  }

  public initialize() {
    this.io.on("connection", (socket) => {
      socket.on("message", (body) => {
        console.log("Listening websocket - [Message]");

        socket.broadcast.emit("message", {
          body,
          from: socket.id.slice(8),
        });
      });
    });
  }
}
