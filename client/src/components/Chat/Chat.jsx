import React, {useState, useEffect} from "react";
import {io} from "socket.io-client";

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const socket = io("http://localhost:4000");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSend = (event) => {
    event.preventDefault();
    if (message.trim() !== "") {
      socket.emit("message", message);
      setMessage("");
    }
  };

  const handlePopupClose = () => {
    setIsMinimized(true);
  };

  const handleChatIconClick = () => {
    setIsMinimized(false);
  };

  return (
    <>
      {showPopup && (
        <div
          className={`fixed bottom-6 right-6 bg-white border shadow-lg py-4 px-4 rounded-lg transition-all duration-500 ${
            isMinimized ? "rounded-full bg-green-400" : "max-w-lg max-h-lg"
          }`}
        >
          {isMinimized ? (
            <div className="flex items-center justify-center h-full w-full">
              <button
                className=""
                onClick={handleChatIconClick}
              >
                <svg
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-700">
                  Задайте нам вопрос!
                </h2>
              </div>
              <button
                className="absolute top-0 right-2 m-3"
                onClick={handlePopupClose}
              >
                <svg
                  className="h-5 w-6 text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-scroll">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`${
                        index % 2 === 0

                          ? "flex-row"
                          : "flex-row-reverse"
                      } flex items-center justify-between mb-2} > <div className={${
                        index % 2 === 0 ? "bg-blue-500" : "bg-green-500"
                      } rounded-lg p-2 max-w-2/3} > <p className={${
                        index % 2 === 0 ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {message}

                    </div>

                  ))}
                </div>
                <form onSubmit={handleSend} className="flex mt-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="flex-2 rounded border-b text-gray-800 border-gray-200 bg-white px-4 py-2 mr-4"
                    placeholder="Введите сообщение"
                  />
                  <button
                    className="rounded bg-green-600 text-white px-4 py-2 hover:bg-green-800 transition-colors duration-300">
                    Send
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
      {!isMinimized && (
        <button
          className="fixed bottom-0 right-0 m-4 p-1 bg-white-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
          onClick={handleChatIconClick}
        >
          ?
        </button>
      )}
    </>
  );
};
