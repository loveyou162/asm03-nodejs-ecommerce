const { Server } = require("socket.io");
const Message = require("../models/chat");
const Room = require("../models/room");

// Function to initialize Socket.IO
const initSocketIO = (server) => {
  // Create a new instance of Socket.IO and pass the server instance to it
  //   console.log(5, server);
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3001",
        "http://localhost:3000",
        "http://localhost:3002",
        "https://admin-nodejs-03-4a9f5.web.app",
        "https://client-nodejs-03-41bd8.web.app",
      ],
      methods: ["GET", "POST"],
    },
  });

  // Handle connections
  io.on("connection", (socket) => {
    console.log("Client connected", socket.id);
    socket.on("newRoomId", async (data) => {
      // xóa hết sự có mặt khi người dùng tạo phòng mới
      const rooms = socket.rooms;
      for (const room of rooms) {
        Room.deleteMany({ userId: data.user._id })
          .then((room) => {
            console.log("33", room);
            console.log("đã xóa các phòng cũ của user đó");
          })
          .catch((err) => {
            next(err);
          });
        // Message.deleteMany()
        socket.leave(room);
      }
      socket.join(data.room);
      if (data.room) {
        const newMessage = new Message({
          content: data.message,
          userId: data.user,
          roomId: data.roomId,
          role: data.role,
        });

        const newRoom = new Room({
          roomId: data.room,
          messages: [],
          userId: data.user,
        });
        await newRoom.save();
        const arrRoom = await Room.find().populate("messages.messageId");
        io.emit("c-tao-phong", arrRoom);
      }
    });
    socket.on("vao-phong", (data) => {
      // xóa hết sự có mặt khi người dùng vào phòng mới
      const rooms = socket.rooms;
      for (const room of rooms) {
        socket.leave(room);
      }
      socket.join(data);
      Room.find({ roomId: data })
        .populate("messages.messageId")
        .then((result) => io.sockets.emit("vao-phong1", result))
        .catch((err) => console.log(err));
    });
    socket.on("end-room", async (data) => {
      const rooms = socket.rooms;
      for (const room of rooms) {
        await Room.deleteOne({ roomId: data.roomId });
        await Message.deleteMany({
          $or: [
            { roomId: data.roomId }, // Tin nhắn có roomId
            { roomId: null }, // Tin nhắn có roomId là null
          ],
        });
        socket.leave(room);
      }
      Room.find()
        // trả về tất cả các phòng
        .then((ss) => io.sockets.emit("c-end-phong", ss))
        .catch((err) => console.log(err));
    });
    // client và admin chat với nhau thì cập nhật trên mongo
    socket.on("send-admin", async (data) => {
      console.log(90, data);
      try {
        //tạo message mới khi có tin nhắn mới
        const newMessage = new Message({
          content: data.message,
          // userId: data.user,
          roomId: data.roomId,
          role: data.role,
        });
        await newMessage.save();

        //tìm kiếm room với roomId và thêm tin nhắn mới vào room đó => room ban đầu của user
        let room = await Room.findOne({ roomId: data.roomId }).populate(
          "messages.messageId"
        );
        console.log(40, room);
        room.messages.push({ messageId: newMessage._id });

        await room.save();
        const selectedRoom = await Room.findOne({
          roomId: data.roomId,
        }).populate("messages.messageId");

        //gửi tin nhắn cho toàn bộ client và admin
        io.in(data.roomId).emit(data.roomId, {
          message: newMessage,
          roomId: selectedRoom.roomId,
          room: selectedRoom,
          user: data.user,
        });
      } catch (err) {
        console.log(err);
      }
    });
    socket.on("list-room", (data) => {
      Room.find()
        .populate("messages.messageId")
        .then((room) => {
          socket.emit("list-room1", room);
        })
        .catch((err) => {
          next(err);
        });
    });
    // Handle disconnections
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

// Export the function to initialize Socket.IO
module.exports = initSocketIO;
