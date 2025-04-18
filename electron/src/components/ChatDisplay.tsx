import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import Loader from './Loader';

interface ChatDisplayProps {
  messages: {
    text: string;
    isBot: boolean;
    time?: string;
  }[];
  showLoader: boolean;
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({ messages, showLoader }) => {
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (displayRef.current) {
      displayRef.current.scrollTop = displayRef.current.scrollHeight;
    }
  }, [messages, showLoader]);

  return (
    <div ref={displayRef} className="md:w-1/2 h-full">
      <div className="w-full flex flex-col">
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            message={msg.text}
            isLeft={!msg.isBot}
            title={msg.isBot ? "bot" : "me"}
            time={msg.time}
          />
        ))}
        {showLoader && <Loader />}
      </div>
    </div>
  );
};

export default ChatDisplay;
