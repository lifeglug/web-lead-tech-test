import { create } from "zustand";

export type Message = {
  id: number;
  senderId: number;
  recipientId: number;
  content: string;
  timestamp: string;
};

export type MessageInput = {
  senderId: number;
  recipientId: number;
  content: string;
};

type MessagesState = {
  messages: Message[];
  createMessage: (message: MessageInput) => void;
};

const SAMPLE_MESSAGES = [
  {
    id: 0,
    senderId: 1,
    recipientId: 2,
    content: 'Test one',
    timestamp: '2025-07-30T09:00:00.000Z ',
  },
  {
    id: 1,
    senderId: 1,
    recipientId: 2,
    content: 'Test two',
    timestamp: '2025-07-30T09:01:00.000Z ',
  },
  {
    id: 2,
    senderId: 1,
    recipientId: 2,
    content: 'Test three',
    timestamp: '2025-07-30T10:05:00.000Z ',
  },
  {
    id: 3,
    senderId: 2,
    recipientId: 1,
    content: 'Test four',
    timestamp: '2025-07-30T10:10:00.000Z ',
  }
];

const useMessagesStore = create<MessagesState>()((set, get) => ({
  messages: SAMPLE_MESSAGES,
  createMessage: (message: MessageInput) =>
    set((state) => {
      const newMessage: Message = {
        id: state.messages.length + 1,
        senderId: message.senderId,
        recipientId: message.recipientId,
        content: message.content,
        timestamp: new Date().toISOString(),
      };
      return { messages: [...state.messages, newMessage] };
    }),
}));

export default useMessagesStore;
