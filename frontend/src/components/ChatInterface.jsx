// components/ChatInterface.jsx
import { useState, useEffect, useRef } from 'react';
import { logout } from '@/services/authService';
import { fetchConversations, sendMessage } from '@/services/conversationService';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { BsRobot } from 'react-icons/bs';

export default function ChatInterface({ onLogout }) {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const loadConversations = async () => {
    try {
      const data = await fetchConversations();
      setConversations(data);
    } catch (error) {
      console.error('Failed to load conversations');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (input) => {
    // Add user message to conversation immediately
    setConversations(prev => [...prev, { type: 'user', content: input }]);
    setIsLoading(true);

    try {
      const response = await sendMessage(input);

      // Add bot response to conversation
      setConversations(prev => [...prev, { type: 'bot', content: response._output }]);
    } catch (error) {
      setConversations(prev => [...prev, {
        type: 'bot',
        content: 'Sorry, there was an error processing your request.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Code Explainer</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main conversation area */}
      <div className="flex-1 overflow-hidden flex flex-col max-w-6xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversations.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <BsRobot className="mx-auto text-5xl mb-3" />
                <p className="text-xl font-medium">Welcome to Code Explainer!</p>
                <p className="mt-2">Enter some code below to get started.</p>
              </div>
            </div>
          ) : (
            conversations.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 bg-white shadow-inner">
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}