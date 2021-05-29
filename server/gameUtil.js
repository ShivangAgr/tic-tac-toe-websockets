module.exports = function makeMove(gameState, player, block) {
  // also checked on client-side
  if (!player || player !== gameState.turn || gameState.blocks[block] !== "")
    return null;

  console.log("Original gameState before makeMove:\n", gameState);

  gameState.blocks[block] = player;
  gameState.turn = gameState.turn === "X" ? "O" : "X";
  gameState.status = checkGameEnd(gameState.blocks);

  console.log("Updated gameState after makeMove:\n", gameState);
};

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
