import { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { AppContent } from '../context/LoginContent';
import socket from '../../socket';
import axios from 'axios';
import { format } from 'date-fns';

const MiddleChat = () => {
  const { chatUser, matchedUsers, userData, backendUrl, onlineUsers } = useContext(AppContent);
  const selectedUser = matchedUsers.find(u => u._id === chatUser);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const roomId = userData?._id && chatUser ? [userData._id, chatUser].sort().join('_') : '';

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleReceive = useCallback((msg) => {
    setMessages(prev => [...prev, msg]);
    scrollToBottom();
  }, [scrollToBottom]);

  useEffect(() => {
    if (!chatUser || !userData || !roomId) return;

    setIsLoading(true);
    socket.emit('joinRoom', roomId);

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/chat/messages?receiverId=${chatUser}`);
        setMessages(Array.isArray(res.data) ? res.data : []);
        scrollToBottom();
      } catch (err) {
        setError('Failed to load messages');
        console.error('Fetch messages error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const markMessagesSeen = async () => {
      try {
        await axios.put(`${backendUrl}/api/chat/mark-seen`, {
          senderId: chatUser,
          receiverId: userData._id,
          roomId,
        });
        socket.emit('messageSeen', { roomId });
      } catch (err) {
        console.error('Mark seen error:', err);
      }
    };

    fetchMessages();
    markMessagesSeen();

    socket.on('receiveMessage', handleReceive);

    const handleSeenMessage = ({ roomId: receivedRoomId }) => {
      if (receivedRoomId === roomId) {
        setMessages(prev =>
          prev.map(msg => {
            if (msg.roomId === roomId && !msg.seen && msg.senderId === userData._id) {
              return { ...msg, seen: true };
            }
            return msg;
          })
        );
      }
    };

    socket.on('messageSeen', handleSeenMessage);

    socket.on('connect_error', (err) => {
      setError('Connection error');
      console.error('Socket connection error:', err);
    });

    return () => {
      socket.off('receiveMessage', handleReceive);
      socket.off('messageSeen', handleSeenMessage);
      socket.off('connect_error');
      socket.emit('leaveRoom', roomId);
    };
  }, [chatUser, userData, roomId, backendUrl, handleReceive, scrollToBottom]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || !chatUser || !userData) return;

    const msg = {
      senderId: userData._id,
      receiverId: chatUser,
      roomId,
      message: input,
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(`${backendUrl}/api/chat/send`, msg);
      socket.emit('sendMessage', { roomId, message: msg });
      setInput('');
      scrollToBottom();
    } catch (err) {
      setError('Failed to send message');
      console.error('Send message error:', err);
    }
  }, [input, chatUser, userData, roomId, backendUrl, scrollToBottom]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  if (!selectedUser) {
    return (
      <div className="flex h-full flex-col w-full items-center gap-2 justify-center text-gray-500">
        <i className="fa-solid text-blue-500 fa-comment-dots text-4xl" />
        Select a user to start chatting
      </div>
    );
  }

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
  };
  return (
    <div className="flex h-full w-full flex-col">
      <div className="bg-white p-4 flex items-center gap-2 border-b-2 border-gray-200">
        <span className='h-[35px] text-white w-[35px] grid place-content-center text-lg rounded-full' style={{ backgroundColor: stringToColor(selectedUser.name) }}>{selectedUser.name.slice(0, 1)}</span>
        <div className="text-lg font-medium text-blue-500">{selectedUser.name}<span className="text-sm text-gray-600"> ({selectedUser.designation})</span></div>
        <span className={`text-sm font-semibold ${onlineUsers.includes(selectedUser._id) ? 'text-green-500' : 'text-gray-400'}`}>
          {onlineUsers.includes(selectedUser._id) ? '● Online' : '● Offline'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        {error && <div className="p-2 text-center text-sm text-red-500">{error}</div>}
        {isLoading ? (
          <div className="text-center text-sm text-gray-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-sm text-gray-500">No messages yet</div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={msg._id || i}
              className={`my-2 flex ${msg.senderId === userData._id ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-[70%]">
                <div
                  className={`rounded-md shadow-sm p-2 text-sm font-light ${msg.senderId === userData._id
                    ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white'
                    : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  <span className="pr-4">{msg.message}</span>
                  <span className="text-[10px] font-medium">
                    {format(new Date(msg.createdAt || msg.timestamp), 'HH:mm')}{' '}
                    {msg.senderId === userData._id && (
                      <i className={`fa-solid ${msg.seen ? 'fa-check-double' : 'fa-check'}`} />
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-2 border-t-2 border-gray-200  bg-white p-4">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 resize-none shadow-md rounded-full bg-white py-2 px-4 border text-sm border-gray-200"
          placeholder="Type a message..."
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || !chatUser}
          className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MiddleChat;
