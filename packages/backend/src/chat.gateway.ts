import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./modules/chat/chat.service";
import { ChatMessage } from "./modules/chat/entities/chat-message.entity";

@WebSocketGateway({cors: true, transports: ['websocket']})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(private chatService: ChatService) {
    }

    @WebSocketServer()
    webSocketServer: Server;

    @SubscribeMessage("newMessage")
    handleNewMessage(@MessageBody() message: { transactionId: string, content: string }, @ConnectedSocket() client: Socket): void {
        const from = client.handshake.auth.userId;
        this.chatService.create({
            transactionId: message.transactionId,
            userId: from,
            content: message.content
        }).then((chatMessage: ChatMessage) => {
            this.webSocketServer.to(message.transactionId).emit("newMessage", {
                ...message,
                from,
                time: chatMessage.creationTimestamp
            });
        }).catch(reason => {
            console.log(reason);
        })

    }

    handleConnection(@ConnectedSocket() client: Socket, ...args: any[]): any {
        const transactionsIds: string[] = ["34b348a1-213c-4301-911a-2ce067fac531"];
        client.join(transactionsIds);
    }

    handleDisconnect(client: any): any {
    }

}