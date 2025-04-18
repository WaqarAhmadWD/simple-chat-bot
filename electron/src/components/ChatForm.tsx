// src/components/ChatForm.tsx
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { request } from '../utils/helpers';
import ImagePreview from './ImagePreview';
import filePNG from "@/assets/file.png"

interface ChatFormProps {
  onMessageSend: (message: string, isBot: boolean) => void;
  onLoaderToggle: (show: boolean) => void;
}

const ChatForm: React.FC<ChatFormProps> = ({ onMessageSend, onLoaderToggle }) => {
  const [input, setInput] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() && !image) return;
    
    // Add user message to chat
    onMessageSend(input, false);
    
    // Show loader
    onLoaderToggle(true);
    
    const currentImage = image;
    // Reset form state
    setInput('');
    setImage(null);
    setPreviewUrl(null);
    
    let parts = [{ text: input }];
    
    if (currentImage) {
      parts.push({
        inlineData: {
          mimeType: "image/png",
          data: currentImage,
        }
      });
    }
    
    const result = await request({
      method: "POST",
      data: {
        contents: [
          {
            parts: parts,
            role: "user"
          }
        ],
        generationConfig: {
          temperature: 0.5
        }
      }
    });
    
    // Hide loader
    onLoaderToggle(false);
    
    if (result) {
      onMessageSend(result.candidates[0].content.parts[0].text, true);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      // Extract base64 data without the prefix
      setImage(result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed bottom-4 md:w-1/2">
      <form onSubmit={handleSubmit}>
        <div className="flex w-full justify-center items-end gap-2">
          <div className="md:w-[85%]">
            <div>
              <ImagePreview imageUrl={previewUrl} />
            </div>
            <div className="h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg flex justify-between items-center focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <input 
                type="text" 
                placeholder="Ask anything" 
                className="outline-none w-full h-full p-2.5 bg-gray-50 dark:bg-gray-700 rounded-lg"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <input 
                type="file" 
                id="file_data" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
              />
              <label htmlFor="file_data" className="cursor-pointer">
                <img src={filePNG} alt="" className="w-8 h-8 text-white" />
              </label>
            </div>
          </div>
          <button 
            type="submit" 
            className="relative cursor-pointer inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Submit
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;