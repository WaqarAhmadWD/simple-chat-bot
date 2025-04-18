import React, { useState } from 'react';
import ChatForm from './components/ChatForm';
import ChatDisplay from './components/ChatDisplay';
import { getCurrentTime } from './utils/helpers';


const App: React.FC = () => {
  const [messages, setMessages] = useState<Array<{
    text: string;
    isBot: boolean;
    time: string;
  }>>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const handleMessageSend = (message: string, isBot: boolean) => {
    setMessages(prev => [
      ...prev,
      {
        text: message,
        isBot,
        time: getCurrentTime()
      }
    ]);
  };

  return (
    <div className="w-full min-h-screen dark:bg-slate-900 bg-slate-300 flex justify-center p-5">
      <ChatDisplay messages={messages} showLoader={showLoader} />
      <ChatForm 
        onMessageSend={handleMessageSend} 
        onLoaderToggle={setShowLoader} 
      />
    </div>
  );
};

export default App;
