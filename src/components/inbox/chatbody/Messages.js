import { useSelector } from "react-redux";
import Message from "./Message";

export default function Messages({ messages = [] }) {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  return (
    <div className='relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse'>
      <ul className='space-y-2'>
        {messages
          .slice()
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((message) => {
            const { id, message: latMessage, sender } = message || {};
            const justify = sender.email === email ? "end" : "start";
            return <Message justify={justify} message='I am fine what about you?' />;
          })}
      </ul>
    </div>
  );
}
