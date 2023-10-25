import { useEffect, useState } from "react";
import io from "socket.io-client";

const Home = () => {
  // const [message, setMessage] = useState([]);
  // const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<unknown | null>(null);
  const api = import.meta.env.VITE_API_ENDPOINT;

  // useEffect(() => {
  //   socket.on("message", (message) => {
  //     setMessage((prevMessages) => [...prevMessages, message]);
  //   });
  // }, []);

  useEffect(() => {
    if (socket) {
      socket.once("connect", () => {
        socket.emit("authenticate", {
          email: "test@gmail.com",
          password: "password",
        });
      });
    }
  }, [socket]);
  const sendMessage = () => {
    const connectSocket = io(api);
    setSocket(connectSocket);

    // if (newMessage.trim() !== "") {
    //   // Emit the message to the server
    //   socket.emit("message", newMessage);
    //   setNewMessage("");
    // }
  };

  return (
    <div className="grid grid-cols-2">
      <div className=" bg-black h-[100vh]"></div>
      <div className="relative overflow-y-hidden">
        <h4 className="mt-2 text-3xl text-center">Welcome to WEME</h4>
        {/* <div>
          {message.map((message, index) => (
            <p className="pl-2 text-2xl" key={index}>
              {message}
            </p>
          ))}
        </div> */}
        <div className=" absolute bottom-0 w-full h-[10rem] border flex">
          <textarea
            placeholder="message here..."
            className="w-full h-full pt-2 pl-2 text-2xl outline-none resize-none"
            // onChange={(e) => setNewMessage(e.target.value)}
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
