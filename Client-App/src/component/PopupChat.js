import classes from "./Popupchat.module.css";
import imgAdmin from "../assets/Resource Assignment 03/admin.png";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
function PopupChat() {
  //hàm ẩn hiện hộp chat
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentName"));
  const roomId = localStorage.getItem("roomId");
  const dataSocket = {
    message: message,
    user: currentUser,
    roomId: roomId,
    role: "client",
  };
  const boxActive = () => {
    setActive(!active);
  };
  useEffect(() => {
    socket.on("clientReceiveMessage", (data) => {
      console.log(data);
      if (data.message.role === "admin") {
        localStorage.removeItem("roomId");
        localStorage.setItem("roomId", data.roomId);
        setReceiveMessage(data.room);
        setActive(true);
      }
    });
    socket.on("removeRoom", (data) => {
      if (data.remove === "remove-room") {
        localStorage.removeItem("roomId");
        setActive(false);
      }
    });
  }, [socket]);

  //hàm sắp xếp lại tin nhắn theo trình tự thời gian mới nhất
  const sortedMessages = receiveMessage
    ? receiveMessage.messages.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      )
    : [];
  function generateNewRoomId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  const sendMessage = () => {
    if (!localStorage.getItem("roomId")) {
      const newRoomId = generateNewRoomId(); // Hàm tạo roomId mới
      localStorage.setItem("roomId", newRoomId);
      socket.emit("newRoomId", { newRoomId, user: currentUser });
    }
    socket.emit("clientSendMessage", dataSocket);
    setMessage("");
  };
  const messageChangeHandler = (e) => {
    const messageValue = e.target.value;

    setMessage(messageValue);
  };
  return (
    <div className={`${classes.popupChat}`}>
      <div className={`${classes["box-chat"]} ${active && classes.show}`}>
        <div className={classes["boxChat-header"]}>
          <h3>Customer Support</h3>
          <button>Let's chat app</button>
        </div>
        {/* demo chat */}
        <div className={classes["chat-messages"]} id="chatMessages">
          {sortedMessages.length > 0 &&
            sortedMessages.map((message) => {
              // Kiểm tra nếu tin nhắn không có nội dung, bỏ qua việc render
              if (!message.messageId.content) {
                return null;
              }
              return (
                <div
                  key={message._id}
                  className={
                    message.messageId.role === "admin"
                      ? classes["admin-message"]
                      : classes["client-message"]
                  }
                >
                  <img
                    src={
                      message.messageId.role === "admin" ? imgAdmin : undefined
                    }
                    alt=""
                  />
                  <div className={classes["message-content"]}>
                    <p>{message.messageId.content}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className={classes["chat-input"]}>
          <img
            src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={messageChangeHandler}
          />
          <button>
            {/* tệp đính kèm */}
            <i className="fa-solid fa-paperclip"></i>
          </button>
          <button>
            {/* icon */}
            <i className="fa-solid fa-face-smile"></i>
          </button>
          <button onClick={sendMessage}>
            {/* send */}
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <button className={classes["btn-message"]} onClick={boxActive}>
        <i className="fa-brands fa-facebook-messenger"></i>
      </button>
    </div>
  );
}
export default PopupChat;
