import express from "express";
import http from "http";
import { Server } from "socket.io";
import { Board } from "./entities/Board";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const board = new Board(40);

app.get("/", (req, res) => {
    res.send("Tu putilla");
});

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.emit("board", board.getBoardState);
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
