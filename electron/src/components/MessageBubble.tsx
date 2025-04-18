// src/components/MessageBubble.tsx
import React from 'react';
import { MessageProps } from '../types';
import { getCurrentTime } from '../utils/helpers';

const MessageBubble: React.FC<MessageProps> = ({ 
  isLeft, 
  message, 
  time = getCurrentTime(), 
  title = "system" 
}) => {
  if (isLeft) {
    return (
      <div className="w-full flex justify-end my-2">
        <div className="flex flex-col w-full md:max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 hidden md:block">{time}</span>
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
            {message}
          </p>
          <span className="text-sm font-normal hidden md:block text-gray-500 dark:text-gray-400">Delivered</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full flex justify-start my-2">
        <div className="flex items-start">
          <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700 inline-flex justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br dark:from-gray-400 from-gray-200 dark:to-gray-600 to-gray-300 group-hover:from-gray-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 hidden md:block">{time}</span>
            </div>
            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
              {message}
            </p>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 hidden md:block">Delivered</span>
          </div>
        </div>
      </div>
    );
  }
};

export default MessageBubble;
