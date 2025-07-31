import { SocketAddress } from "net";
import { Socket } from "socket.io"

export type Message = {
    id: number;
    senderId: number;
    recipientId: number;
    content: string;
    timestamp: string;
};

const SOCKET_EVENTS = {
    FETCH_MESSAGES: 'FETCH_MESSAGES',
    FETCH_STORE: 'FETCH_STORE',
    SUBMIT_MESSAGE: 'SUBMIT_MESSAGE',
    PUSH_CONVERSATION: 'PUSH_CONVERSATION',
    PUSH_STORE: 'PUSH_STORE',
};

const initStore = (userCount: number = 3) => {
  const store = [];
  for (let i = 0; i < userCount; i++) {
    let user = [];
    for (let j = 0; j < userCount; j++) {
      let recipients = initMessages(i, j);
      user.push(recipients);
    }
    store.push(user);
  }
  return store;  
};

const initMessages = (userId: number, recipientId: number): Message[] => {
  return [{
    id: 0,
    senderId: userId,
    recipientId: recipientId,
    content: 'Test one',
    timestamp: '2025-07-30T09:00:00.000Z ',
  },
  {
    id: 1,
    senderId: userId,
    recipientId: recipientId,
    content: 'Test two',
    timestamp: '2025-07-30T09:01:00.000Z ',
  },
  {
    id: 2,
    senderId: userId,
    recipientId: recipientId,
    content: 'Test three',
    timestamp: '2025-07-30T10:05:00.000Z ',
  },
  {
    id: 3,
    senderId: recipientId,
    recipientId: userId,
    content: 'Test four',
    timestamp: '2025-07-30T10:10:00.000Z ',
  }]
};

const store = initStore();

export const wsConnection = (socket: Socket) => {
  socket.on(SOCKET_EVENTS.SUBMIT_MESSAGE, (message: Message) => {
    console.log(message);
    store[message.senderId][message.recipientId].push(message);
    socket.emit(SOCKET_EVENTS.PUSH_CONVERSATION, { userId: message.senderId, recipientId: message.recipientId, messages: store[message.senderId][message.recipientId] });
  });

  socket.on(SOCKET_EVENTS.FETCH_MESSAGES, (userId: number, recipientId: number) => {
    socket.emit(SOCKET_EVENTS.PUSH_CONVERSATION, { userId, recipientId, messages: store[userId--][recipientId--] });
  });

  socket.on(SOCKET_EVENTS.FETCH_STORE, () => {
    socket.emit(SOCKET_EVENTS.PUSH_STORE, store);
  });
};
