import { useEffect, useState } from "react";
import classes from "./Chat.module.css";
import imgAdmin from "../../assets/Resource Assignment 03/admin.png";
import { io } from "socket.io-client";
import axios from "axios";
import { NavLink, useLoaderData, useParams } from "react-router-dom";
const socket = io("http://localhost:5000");
const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentName"));
  const roomId = localStorage.getItem("roomId");
  const usering = JSON.parse(localStorage.getItem("useringMessage"));
  const params = useParams();
  const paramsRooms = params.roomId;

  useEffect(() => {
    socket.on("clientReceiveMessage", (data) => {
      console.log(data);
      if (data.message.role === "client") {
        setReceiveMessage(data.room);
        localStorage.setItem("roomId", data.roomId);
        localStorage.setItem("useringMessage", JSON.stringify(data.user));
      }
    });
    socket.on("removeRoom", (data) => {
      if (data.remove === "remove-room") {
        localStorage.removeItem("roomId");
      }
    });
  }, [socket]);
  useEffect(() => {
    const fetchDataHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/admin/detail-room?roomId=${paramsRooms}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response);
        localStorage.setItem("roomId", response.data.roomId);
        localStorage.setItem(
          "useringMessage",
          JSON.stringify(response.data.userId)
        );
        setReceiveMessage(response.data);
      } catch (e) {
        throw new Error({ status: 500 });
      }
    };
    fetchDataHandler();
  }, [paramsRooms]);

  const allRoom = useLoaderData();
  console.log(allRoom);
  const dataSocket = {
    message: message,
    user: usering,
    roomId: roomId,
    role: "admin",
  };

  //hàm sắp xếp lại tin nhắn theo trình tự thời gian mới nhất
  const sortedMessages = receiveMessage
    ? receiveMessage.messages.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      )
    : [];

  // Hàm tạo roomId mới
  function generateNewRoomId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
  const sendMessage = (e) => {
    e.preventDefault();
    if (!localStorage.getItem("roomId")) {
      const newRoomId = generateNewRoomId();
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
