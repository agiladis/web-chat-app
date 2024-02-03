// src/ChatApp.js
import React, { useState, useEffect } from 'react';
import './ChatApp.css'; // Buat file ChatApp.css untuk gaya tambahan

const ChatApp = () => {
  const [rooms, setRooms] = useState([]); // Daftar ruang obrolan
  const [selectedRoom, setSelectedRoom] = useState(null); // Ruang obrolan yang dipilih
  const [messages, setMessages] = useState([]); // Pesan di ruang obrolan yang dipilih
  const [newMessage, setNewMessage] = useState(''); // Pesan baru

  useEffect(() => {
    // Implementasikan logika untuk mendapatkan daftar ruang obrolan dari backend
    // Gantilah URL_API dengan endpoint yang benar dari backend Anda
    fetch('URL_API/rooms')
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error('Error fetching rooms:', error));
  }, []);

  useEffect(() => {
    // Implementasikan logika untuk mendapatkan pesan dari ruang obrolan yang dipilih
    if (selectedRoom) {
      // Gantilah URL_API dengan endpoint yang benar dari backend Anda
      fetch(`URL_API/rooms/${selectedRoom}/messages`)
        .then((response) => response.json())
        .then((data) => setMessages(data))
        .catch((error) => console.error('Error fetching messages:', error));
    }
  }, [selectedRoom]);

  const handleRoomClick = (roomId) => {
    // Ketika ruang obrolan dipilih, atur ruang obrolan yang dipilih
    setSelectedRoom(roomId);
  };

  const handleSendMessage = () => {
    // Implementasikan logika untuk mengirim pesan ke ruang obrolan yang dipilih
    // Gantilah URL_API dengan endpoint yang benar dari backend Anda
    fetch(`URL_API/rooms/${selectedRoom}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages([...messages, data]);
        setNewMessage('');
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <div className="chat-app">
      <div className="sidebar">
        <h2>Ruang Obrolan</h2>
        <ul>
          {rooms.map((room) => (
            <li key={room.id} onClick={() => handleRoomClick(room.id)}>
              {room.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        <h2>
          {selectedRoom
            ? `Ruang Obrolan: ${selectedRoom}`
            : 'Pilih Ruang Obrolan'}
        </h2>
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className="message">
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        {selectedRoom && (
          <div className="message-input">
            <input
              type="text"
              placeholder="Ketik pesan..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Kirim</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
