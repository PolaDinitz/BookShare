export interface ChatMessage {
    content: string;
    time: Date;
    fromSelf: boolean;
    isSystemMessage: boolean;
}

export interface Chat {
    transactionId: string;
    messages: ChatMessage[]
}
