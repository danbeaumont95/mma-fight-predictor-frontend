import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import io from 'socket.io-client';

function WebSocketComponent() {
  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io('http://localhost:8000');

    // Listen for the 'webhook' event
    socket.on('webhook', (data) => {
      console.log('Received a new webhook:', data);
      // Do something with the webhook data in your React component
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}

export default WebSocketComponent;
