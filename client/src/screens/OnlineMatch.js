import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import Board from "../components/Board";
import CopyLogo from "../components/CopyLogo";
import CopyLinkLogo from "../components/CopyLinkLogo";
import "./OnlineMatch.css";

/* socket could be
  directly inside component (initialized then and there)
  outside component (initialized inside)
  inside useEffect
  or best inside a separate util file
*/
let socket;

function OnlineMatch(props) {
  const matchID = props.match.params.matchID;
  const [player, setPlayer] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [gameEnd, setGameEnd] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // io.connect(location.protocol + "//" + location.host);
    // can be used with useLocation()
    // socket = io("ws://192.168.43.230:3001", { query: { matchID: matchID } });
    // const url = "ws://" + window.location.host;
    const url = window.location.protocol + "//" + window.location.host;
    console.log("Plugging into:", url);
    socket = io(url, { query: { matchID: matchID } });

    socket.on("assignPlayer", (newPlayer) => {
      console.log("assignPlayer", newPlayer);
      setPlayer(newPlayer);
    });

    socket.on("updateGameState", (newGameState) => {
      console.log("updateGameState", newGameState);
      setGameState(newGameState);
      if (newGameState.status) setGameEnd(newGameState.status);
    });

    socket.on("playerDisconnected", (message) => {
      console.log("playerDisconnected", message);
      setGameEnd(message);
    });

    // clean unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  function onMove(block) {
    if (!player) alert("You are a spectator!");
    else if (gameState.turn !== player) alert("Wait for your turn!");
    else if (gameState.blocks[block] !== "") alert("Invalid move!");
    else {
      console.log("makeMove", player, block);
      socket.emit("makeMove", player, block);
    }
  }

  function copyToClipboard(txt) {
    let ta = document.createElement("textarea");
    ta.value = txt;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    console.log(`Copied ${txt} to clipboard`);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  }

  function copyToClipboardAlt(txt) {
    navigator.clipboard
      .writeText(txt)
      .then(() => {
        console.log(`Copied ${txt} to clipboard`);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
      })
      .catch(() => {
        console.log(`Error copying ${txt}`);
        setCopied(false);
      });
  }

  if (!gameState) return <h1>Loading gameState...</h1>;

  // TODO: Clearly display matchID
  return (
    <div id="OnlineMatch" className="screen">
      <h1>
        Online Match room code: {matchID}
        <span id="copy" onClick={() => copyToClipboard(matchID)}>
          <CopyLogo />
        </span>
        <span id="copyLink" onClick={() => copyToClipboard(window.location)}>
          <CopyLinkLogo />
        </span>
        <span id="copied">{copied && "Copied!"}</span>
      </h1>

      {!gameEnd && (
        <div id="info">
          {/* <div id="player">
          You are
          {player ? ` playing as ${player}` : " a spectator"}
        </div>
        <div id="turn">Current Turn: {gameState.turn}</div> */}
          It is {gameState.turn === player ? "your" : "opponent's"} turn
        </div>
      )}
      <div id="game-end">{gameEnd}</div>
      {gameEnd && (
        <Link className="btn big-btn back" to="/">
          Return Home
        </Link>
      )}

      <Board blocks={gameState.blocks} disabled={gameEnd} onMove={onMove} />
    </div>
  );
}

export default OnlineMatch;
