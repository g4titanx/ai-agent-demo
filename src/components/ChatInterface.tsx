import { useState } from 'react';
import { useAccount } from 'wagmi';
import { getAgentResponse } from '../lib/agent';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { address, isConnected } = useAccount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !isConnected) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAgentResponse(input, address || '');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-gray-500">Please connect your wallet to start chatting</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
      <div className="h-96 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-4 p-3 rounded-lg ${
              msg.role === 'user' 
                ? 'bg-blue-100 ml-12' 
                : 'bg-gray-100 mr-12'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="bg-gray-100 mr-12 mb-4 p-3 rounded-lg">
            <div className="animate-pulse">Thinking...</div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isLoading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
