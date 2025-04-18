export interface MessageProps {
    message: string;
    isLeft?: boolean;
    title?: string;
    time?: string;
  }
  
  export interface RequestOptions {
    url?: string;
    route?: string;
    method?: string;
    data?: any;
  }
  
  // src/utils/helpers.ts
  export const getCurrentTime = (): string => {
    const now = new Date();
  
    const hours = now.getHours();
    const minutes = now.getMinutes();
  
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  
  export async function request({
    url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
    route = "",
    method = 'GET',
    data = {}
  }: RequestOptions) {
    try {
      const response = await fetch(`${url}${route}`, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        ...(method === 'POST' || method === 'PUT' || method === 'PATCH' ? { body: JSON.stringify(data) } : {})
      });
  
      if (!response.ok) {
        return null;
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  
  export const points = (result: any) => {
    try {
      const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/);
      const parsed = JSON.parse(jsonMatch?.[1] || "[]");
      const points = parsed.map((p: any) => p.point);
      return points;
    } catch (err) {
      return null;
    }
  };
  
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
  