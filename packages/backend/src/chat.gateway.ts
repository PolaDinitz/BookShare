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
import { TRANSACTION_STATUS_SYSTEM_MESSAGE } from "./consts/transaction-status-system-message.consts";

@WebSocketGateway({ cors: true, transports: ["websocket"] })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private chatService: ChatService,
              private transactionService: TransactionService) {
  }

  @WebSocketServer()
  webSocketServer: Server;

  @SubscribeMessage("newMessage")
  handleNewMessage(@MessageBody() message: { transactionId: string, content: string }, @ConnectedSocket() client: Socket): void {
    this.sendNewMessage(message, client);
  }

  sendNewMessage(message: { transactionId: string, content: string, isSystemMessage?: boolean }, client: Socket): void {
    const from = client.handshake.auth.userId;
    const isSystemMessage = message.isSystemMessage || false;
    this.chatService.create({
      transactionId: message.transactionId,
      userId: from,
      content: message.content,
      isSystemMessage
    }).then((chatMessage: ChatMessage) => {
      this.webSocketServer.to(message.transactionId).emit("newMessage", {
        ...message,
        from,
        time: chatMessage.creationTimestamp,
        isSystemMessage
      });
    }).catch(reason => {
      console.log(reason);
    });
  }

  @SubscribeMessage("joinTransaction")
  handleJoinTransaction(@MessageBody() message: { transactionId: string }, @ConnectedSocket() client: Socket): void {
    client.join(message.transactionId);
  }

  @SubscribeMessage("newTransaction")
  handleNewTransaction(@MessageBody() message: { transactionId: string }, @ConnectedSocket() client: Socket): void {
    const userId = client.handshake.auth.userId;
    this.transactionService.getTransactionById(message.transactionId)
      .then((transaction: Transaction) => {
        client.join(message.transactionId);
        this.webSocketServer.emit("newTransaction", {
          ...message,
          userId: userId === transaction.borrowUserId ? transaction.userBook.userId : transaction.borrowUserId
        });
      })
  }

  @SubscribeMessage("transactionChanged")
  handleTransactionStatusChanged(@MessageBody() message: { transactionId: string }, @ConnectedSocket() client: Socket): void {
    this.webSocketServer.to(message.transactionId).emit("transactionChanged", message);
    this.transactionService.getTransactionById(message.transactionId)
      .then((transaction: Transaction) => {
        this.sendNewMessage({
          transactionId: message.transactionId,
          content: TRANSACTION_STATUS_SYSTEM_MESSAGE.get(transaction.status),
          isSystemMessage: true
        }, client)
      });
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
      });
  }

  handleDisconnect(@ConnectedSocket() client: Socket): any {
  }

}