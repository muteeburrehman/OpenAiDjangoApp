// components/ChatInput.jsx
import { useState } from 'react';
import { BsSend } from 'react-icons/bs';

export default function ChatInput({ onSendMessage, isLoading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    onSendMessage(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
      <div className="flex items-center relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Enter code to explain..."
          className="flex-1 p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="3"
          disabled={isLoading}
        ></textarea>
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`absolute right-3 bottom-3 p-2 rounded-full ${
            isLoading || !input.trim() 
              ? 'text-gray-400 bg-gray-100' 
              : 'text-white bg-blue-600 hover:bg-blue-700'
          } transition-colors`}
        >
          <BsSend />
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Press Enter to send. Use Shift+Enter for new line.
      </p>
    </form>
  );
}