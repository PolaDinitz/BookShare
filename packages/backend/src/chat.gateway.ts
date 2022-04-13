import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';

@WebSocketGateway(80, {namespace: "chat"})
export class ChatGateway {

    @WebSocketServer()
    webSocketServer: Server;

    @SubscribeMessage("message")
    handleMessage(@MessageBody() message: string): void {
        this.webSocketServer.emit("message", message);
    }

}