import { io } from 'socket.io-client';

import { SOCKET_EVENTS } from './events';
import type { Message } from '../store/messages.store';

export const socket = io(import.meta.env.VITE_BACKEND);

export const submitMessage = (message: Message) => socket.emit(SOCKET_EVENTS.SUBMIT_MESSAGE, message);
