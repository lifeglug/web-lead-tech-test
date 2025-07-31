import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Start the server on port 3001
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export type Message = {
    id: number;
    senderId: number;
    recipientId: number;
    content: string;
    timestamp: string;
};

const SOCKET_EVENTS = {
    SUBMIT_MESSAGE: 'SUBMIT_MESSAGE',
    PUSH_CONVERSATION: 'PUSH_CONVERSATION',
};

io.on('connection', socket => {
  socket.on(SOCKET_EVENTS.SUBMIT_MESSAGE, (message: Message) => {
    console.log(message);
    io.emit(SOCKET_EVENTS.PUSH_CONVERSATION, { userId: message.senderId, recipientId: message.recipientId, message: message });
  });
});