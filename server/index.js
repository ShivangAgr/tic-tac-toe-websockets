const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const makeMove = require("./gameUtil");

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Answer API requests.
// app.get("/api", (req, res) => {
//   res.set("Content-Type", "application/json");
//   res.send('{"message":"Hello from the custom server!"}');
// });

// All remaining requests return the React app, so it can handle routing.
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

io.on("connection", (socket) => {
  const { matchID } = socket.handshake.query;
  console.log(`New connection in room ${matchID} with socket.id ${socket.id}`);

  // add players and visitors to room
  socket.join(matchID);
  // io.sockets.adapter.rooms is Map<Room: string, Set<SocketID>>
  const room = io.sockets.adapter.rooms.get(matchID);

  // use room object to store gameState
  if (!room.gameState)
    room.gameState = {
      players: [],
      blocks: ["", "", "", "", "", "", "", "", ""],
      turn: "X",
      status: null,
    };

  // first player 'X', second 'O', others null
  if (room.gameState.players.length === 0) socket.player = "X";
  else if (room.gameState.players.length === 1) socket.player = "O";
  else socket.player = null;
  console.log(`Assigned ${socket.player} to ${socket.id}`);

  // add socket IDs to players list
  if (socket.player) room.gameState.players.push(socket.id);

  // let client know what they're assigned
  socket.emit("assignPlayer", socket.player);
  // let roommates know about current gameState
  io.to(matchID).emit("updateGameState", room.gameState);
  console.log("updateGameState", room.gameState);

  // when either player clicks a block
  socket.on("makeMove", (player, block) => {
    // update gameState's blocks, turn, status
    makeMove(room.gameState, player, block);

    // let roommates know about new gameState
    io.to(matchID).emit("updateGameState", room.gameState);
  });

  socket.on("disconnect", () => {
    if (socket.player)
      socket.broadcast
        .to(matchID)
        .emit("playerDisconnected", `Player ${socket.player} has left!`);
  });
});

const port = process.env.PORT || 3001;
http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
