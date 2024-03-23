import { useEffect, useState, useRef } from "react";
import classes from "./Chat.module.css";
import imgAdmin from "../../assets/Resource Assignment 03/admin.png";
import { io } from "socket.io-client";
import axios from "axios";
import { NavLink } from "react-router-dom";
const socket = io("http://localhost:5000");
const ChatPage = () => {
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [allRoom, setAllRoom] = useState([]);
  const chatMessagesRef = useRef(null);
  useEffect(() => {
    if (roomId) {
      socket.emit("vao-phong", roomId);
    } else {
      socket.emit("list-room", "");
    }
  }, [socket, roomId]);

  socket.on("vao-phong1", (data) => {
    if (data.find((mov) => mov.roomId === roomId)) {
      setReceiveMessage(data.find((mov) => mov.roomId === roomId).messages);
    }
  });
  // lắng nghe server gửi danh sách phòng
  socket.on("list-room1", (data) => {
    setAllRoom(data);
  });

  const dataSocket = {
    message: message,
    roomId: roomId,
    role: "admin",
  };

  //hàm sắp xếp lại tin nhắn theo trình tự thời gian mới nhất
  const sortedMessages = receiveMessage
    ? receiveMessage.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      )
    : [];

  const sendMessage = () => {
    console.log("56");
    socket.emit("send-admin", dataSocket);

    setMessage("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const messageChangeHandler = (e) => {
    const messageValue = e.target.value;
    setMessage(messageValue);
  };
  socket.on(roomId, (data) => {
    setReceiveMessage(data.room.messages);
  });
  useEffect(() => {
    // Tự động cuộn xuống dưới cùng của hộp tin nhắn khi có tin nhắn mới
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [receiveMessage]);
  socket.on("c-end-phong", (data) => {
    setAllRoom(data);
    setRoomId("");
    setMessage("");
  });
  return (
    <div className={classes.ChatPage}>
      <div className={classes["chat-info"]}>
        <h3>Chat</h3>
        <p>Apps / Chat</p>
      </div>
      <table className={classes.tableChat}>
        <td className={classes.column1}>
          <div className={classes["box-search"]}>
            <input
              type="text"
              className={classes["search-contact"]}
              placeholder="Search Contact"
            />
          </div>
          <ul className={classes["box-room"]}>
            {allRoom.map((room) => (
              <li key={room.roomId}>
                <NavLink
                  to={`/admin/chat/${room.roomId}`}
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  onClick={() => setRoomId(room.roomId)}
                  // onClick={fetchDataHandler}
                >
                  <img src={imgAdmin} alt="" />
                  <p>{room.roomId}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </td>
        <td className={classes.column2}>
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
                        message.messageId.role === "client" &&
                        "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
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
          <div className={classes["box-input-message"]}>
            <input
              type="text"
              className={classes["input-mes"]}
              placeholder="Type and enter"
              value={message}
              onChange={messageChangeHandler}
              onKeyDown={handleKeyPress}
            />
            <button onClick={sendMessage}>
              <ion-icon name="send-outline"></ion-icon>
            </button>
          </div>
        </td>
      </table>
    </div>
  );
};
export default ChatPage;
export async function loader() {
  try {
    const response = await axios.get("http://localhost:5000/admin/all-room", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}
