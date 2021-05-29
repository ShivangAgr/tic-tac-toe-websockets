import { useState } from "react";
import { Link } from "react-router-dom";
import Board from "../components/Board";
import minimax from "../util/minimax";
import "./LocalMatch.css";

function LocalMatch(props) {
  const [blocks, setBlocks] = useState(["", "", "", "", "", "", "", "", ""]);
  const [status, setStatus] = useState(null);

  const onMove = (block) => {
    if (blocks[block] !== "") alert("Invalid move!");
    else {
      console.log("makeMove", block);
      blocks[block] = "X";
      setBlocks(blocks.slice());
      gameEnd(blocks);
      const AIMove = minimax(blocks);
      console.log("AIMove", AIMove);
      blocks[AIMove] = "O";
      setBlocks(blocks.slice());
      gameEnd(blocks);
    }
  };

  function gameEnd(blocks) {
    const end = checkGameEnd(blocks);
    if (end) setStatus(end);
  }

  return (
    <div id="LocalMatch" className="screen">
      <h1>VS Computer</h1>
      <em>You can play with THE computer here. Good luck!</em>

      <div id="game-end">{status}</div>
      {status && (
        <Link className="btn home" to="/">
          Return Home
        </Link>
      )}
      <Board blocks={blocks} disabled={status} onMove={onMove} />
    </div>
  );
}

function checkGameEnd(blocks) {
  if (winning(blocks, "X")) return "Player X has won!";
  if (winning(blocks, "O")) return "Player O has won!";

  for (let i = 0; i < blocks.length; ++i) if (blocks[i] === "") return null;

  return "It is a DRAW.";
}

function winning(blocks, player) {
  return (
    (blocks[0] === player && blocks[1] === player && blocks[2] === player) ||
    (blocks[3] === player && blocks[4] === player && blocks[5] === player) ||
    (blocks[6] === player && blocks[7] === player && blocks[8] === player) ||
    (blocks[0] === player && blocks[3] === player && blocks[6] === player) ||
    (blocks[1] === player && blocks[4] === player && blocks[7] === player) ||
    (blocks[2] === player && blocks[5] === player && blocks[8] === player) ||
    (blocks[0] === player && blocks[4] === player && blocks[8] === player) ||
    (blocks[2] === player && blocks[4] === player && blocks[6] === player)
  );
}

export default LocalMatch;
