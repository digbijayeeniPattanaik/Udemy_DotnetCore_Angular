export interface Message {
    id: Number;
    senderId: Number;
    senderKnownAs: string;
    recipientId: Number;
    recipientKnownAs: string;
    senderPhotoUrl: string;
    recipientPhotoUrl: string;
    content: string;
    isRead: boolean;
    dateRead: Date;
    messageSent: Date;
}
