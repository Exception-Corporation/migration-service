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
      console.log(socket.id);
      socket.on("message", (body) => {
        socket.broadcast.emit("message", {
          body,
          from: socket.id.slice(8),
        });
      });
    });
  }
}
