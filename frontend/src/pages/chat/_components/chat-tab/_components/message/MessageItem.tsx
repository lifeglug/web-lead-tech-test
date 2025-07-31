import type { Message } from "../../../../../../store/messages.store.ts";

type MessageProps = {
  message: Message;
  currentUserID: number;
};

const MessageItem = ({ message, currentUserID }: MessageProps) => {
  return (
    <div className={`rounded-xl p-4 text-m m-2 w-2/3 ${
      message.senderId === currentUserID ? 'text-white rounded-br-none ms-auto bg-[var(--colour-muzz-primary)]' : 'rounded-bl-none bg-gray-200'
    }`}>
      {message.content}
    </div>
  );
};

export default MessageItem;
