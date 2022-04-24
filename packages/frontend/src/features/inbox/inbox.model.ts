export interface ChatMessage {
    content: string;
    time?: string;
    fromSelf: boolean;
}

export interface Chat {
    transactionId: string;
    messages: ChatMessage[]
}
