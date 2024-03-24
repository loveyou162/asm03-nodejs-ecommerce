import classes from "./Popupchat.module.css";
import imgAdmin from "../assets/Resource Assignment 03/admin.png";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
function PopupChat() {
  console.log("start");
  //hàm ẩn hiện hộp chat
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [roomId, setRoomId] = useState(localStorage.getItem("roomId") || "");
  const chatMessagesRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("currentName"));
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
    if (localStorage.getItem("roomId")) {
      socket.emit("vao-phong", roomId);
    }
    socket.on("vao-phong1", (data) => {
      console.log(data);
      if (data.find((mov) => mov.roomId === roomId)) {
        const room = data.find((mov) => mov.roomId === roomId);
        if (room && room.messages) {
          setReceiveMessage(room.messages);
        } else {
          setReceiveMessage([]);
        }
      }
    });
  }, [socket]);
  // tìm hết lại những message đã chat

  console.log(receiveMessage);

  function generateNewRoomId() {
    return (Math.random() * 1000000).toFixed(0).toString();
  }

  const sendMessage = () => {
    if (!localStorage.getItem("roomId")) {
      console.log("click2");
      if (message === "/end") {
        alert("bạn chưa có phòng nào để kết thúc");
      } else {
        // tạo phòng mới
        const newRoomId = generateNewRoomId(); // Hàm tạo roomId mới
        setRoomId(newRoomId);
        localStorage.setItem("roomId", newRoomId);
        socket.emit("newRoomId", { room: newRoomId, ...dataSocket });
      }
    }
    if (message === "/end") {
      socket.emit("end-room", {
        roomId: roomId,
      });
      setMessage("");
      localStorage.setItem("roomId", "");
      setRoomId("");
      setReceiveMessage([]);
      alert("đã kết thúc cuộc trò chuyện");
      setActive(false);
      return;
    } else {
      // gửi tin nhắn lên server để gửi cho client
      socket.emit("send-admin", dataSocket);

      setMessage("");
    }
    // socket.emit("create-room", dataSocket);
    setMessage("");
  };
  console.log(receiveMessage);
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  // nhận dữ liệu khi clien tạo phòng và lưu tin nhắn đã gửi
  socket.on("c-tao-phong", (data) => {
    console.log(data);
    if (data.find((mov) => mov.roomId === roomId)) {
      const room = data.find((mov) => mov.roomId === roomId);
      if (room && room.messages) {
        setReceiveMessage(room.messages);
      } else {
        setReceiveMessage([]);
      }
    }
  });
  console.log(roomId);
  socket.on(roomId, (data) => {
    console.log(data);
    setReceiveMessage(data.room.messages);
  });
  console.log(receiveMessage);
  useEffect(() => {
    // Tự động cuộn xuống dưới cùng của hộp tin nhắn khi có tin nhắn mới
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [receiveMessage]);
  //hàm sắp xếp lại tin nhắn theo trình tự thời gian mới nhất
  const sortedMessages = receiveMessage
    ? receiveMessage.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      )
    : [];

  console.log(sortedMessages);
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
        <div
          className={classes["chat-messages"]}
          ref={chatMessagesRef}
          id="chatMessages"
        >
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
            onKeyDown={handleKeyPress}
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
