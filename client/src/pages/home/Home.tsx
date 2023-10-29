/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import io from "socket.io-client";

const Home = () => {
  const [message, setMessage] = useState<any>([]);
  console.log(message, "mesage");

  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<any | null>(null); // Use the correct type for the socket

  const api = import.meta.env.VITE_API_ENDPOINT;

  useEffect(() => {
    const userId = localStorage.getItem("_user");

    if (userId && !socket) {
      // Only create the socket connection once
      const connectSocket = io(api);
      setSocket(connectSocket);

      connectSocket.emit("registerUser", {
        user_id: userId,
      });
      connectSocket.on("chat", (data: any) => {
        if (data.code === 202) {
          setMessage((prevMessages: any) => [
            ...prevMessages,
            { type: "received", content: data.message.message },
          ]);
        } else if (data.code === 201) {
          console.log(data.message);
        }
      });

      connectSocket.emit("createChat");
    }

    // Cleanup when the component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const sendMessage = () => {
    if (socket && newMessage.trim() !== "") {
      socket.emit("chat", {
        message: newMessage,
      });
      setMessage((prevMessages: any) => [
        ...prevMessages,
        { type: "sent", content: newMessage },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div className=" bg-black h-[100vh]"></div>
      <div className="relative overflow-y-hidden">
        <h4 className="mt-2 text-3xl text-center">Welcome to WEME</h4>
        <div className="pl-2">
          {message?.map((msg: any, index: number) => (
            <p
              className={`text-2xl p-3 mb-4 rounded-lg shadow-lg ${
                msg.type === "sent"
                  ? "bg-blue-500 text-white w-fit"
                  : "bg-gray-200 text-black w-fit border p-3"
              }`}
              key={index}
            >
              {msg.content}
            </p>
          ))}
        </div>
        <div className=" absolute bottom-0 w-full h-[10rem] border flex">
          <textarea
            placeholder="message here..."
            className="w-full h-full pt-2 pl-2 text-2xl outline-none resize-none"
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="pl-10 pr-10 text-3xl text-white bg-green-300 hover:bg-green-500"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
