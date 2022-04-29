import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: true, transports: ['websocket'] })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  webSocketServer: Server;

  @SubscribeMessage("newMessage")
  handleNewMessage(@MessageBody() message: { transactionId: string, content: string }, @ConnectedSocket() client: Socket): void {
    const from = client.handshake.auth.email;
    this.webSocketServer.to(message.transactionId).emit("newMessage", { ...message, from });
  }

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]): any {
    console.log(client.id + " has connected to webSocket!");
    const transactionsIds: string[] = ["test1", "test2", "test3"];
    client.join(transactionsIds);
  }

  handleDisconnect(client: any): any {
    console.log(client.id + " has disconnected from webSocket!");
  }

}