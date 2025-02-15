import React, { useState, useEffect, useRef } from 'react';
import { FaComment, FaTimes, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Inline CSS (same as before)
const styles = `
  .chatbot-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .chatbot-toggle {
    background: #3B82F6;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }

  .chatbot-toggle:hover {
    background: #2563EB;
    transform: scale(1.1);
  }

  .chatbot-window {
    width: 320px;
    height: 400px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
  }

  .chatbot-header {
    background: #3B82F6;
    color: white;
    padding: 1rem;
    border-radius: 12px 12px 0 0;
  }

  .chatbot-messages {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    background: #F8FAFC;
  }

  .message {
    margin: 8px 0;
    padding: 10px 14px;
    border-radius: 15px;
    max-width: 80%;
    animation: messageAppear 0.3s ease;
  }

  .user-message {
    background: #3B82F6;
    color: white;
    margin-left: auto;
  }

  .bot-message {
    background: white;
    border: 1px solid #E2E8F0;
    margin-right: auto;
  }

  .chatbot-input {
    display: flex;
    gap: 8px;
    padding: 1rem;
    border-top: 1px solid #E2E8F0;
  }

  .chatbot-input input {
    flex: 1;
    padding: 10px;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    outline: none;
  }

  .chatbot-input button {
    background: #3B82F6;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 14px;
    cursor: pointer;
  }

  @keyframes messageAppear {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const openAI = new OpenAI({
  apiKey: "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",dangerouslyAllowBrowser: true // Use your OpenAI API key here
});

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = { text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Build conversation history
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));

      // Send request to OpenAI API
      const response = await openAI.chat.completions.create({
        model: "gpt-4o-mini", // You can use gpt-3.5-turbo or another model as well
        messages: [...conversationHistory, { role: 'user', content: inputText }],
      });

      // Get response text from OpenAI
      const botText = response.choices[0].message.content;

      setMessages(prev => [...prev, { text: botText, sender: 'bot' }]);
    } catch (error) {
      console.error('OpenAI Error:', error);
      setMessages(prev => [...prev, {
        text: "Sorry, I'm having trouble responding. Please try again.",
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <style>{styles}</style>
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaComment />}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>AI Assistant (OpenAI)</h3>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="message bot-message">
                <FaSpinner className="spinner" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading}>
              {isLoading ? <FaSpinner className="spinner" /> : <FaPaperPlane />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
