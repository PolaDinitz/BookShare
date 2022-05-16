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
import { Transaction } from "./modules/transaction/entities/transaction.entity";
import { TransactionService } from "./modules/transaction/transaction.service";

@WebSocketGateway({cors: true, transports: ['websocket']})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(private chatService: ChatService,
                private transactionService: TransactionService) {
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
        const userId = client.handshake.auth.userId;
        this.transactionService.getTransactionsByUserId(userId)
          .then((transactions: Transaction[]) => {
              const transactionsIds: string[] = transactions.map((transaction) => transaction.id);
              client.join(transactionsIds);
          })
          .catch(reason => {
              console.log(reason);
          })
    }

    handleDisconnect(@ConnectedSocket() client: Socket): any {
    }

}