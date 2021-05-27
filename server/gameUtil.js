module.exports = function makeMove(gameState, player, block) {
  // also checked on client-side
  if (
    !player ||
    player !== room.gameState.turn ||
    gameState.blocks[block] !== ""
  )
    return null;

  console.log(
    "Original gameState before makeMove:\n",
    JSON.stringify(gameState, 2)
  );

  gameState.blocks[block] = player;
  gameState.turn = gameState.turn === "X" ? "O" : "X";
  gameState.status = checkGameEnd(gameState.blocks);

  console.log(
    "Updated gameState after makeMove:\n",
    JSON.stringify(gameState, 2)
  );
};

function checkGameEnd(blocks) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  lines.forEach((l) => {
    if (
      blocks[l[0]] !== "" &&
      blocks[l[0]] === blocks[l[1]] &&
      blocks[l[1]] === blocks[l[2]]
    )
      return blocks[l[0]];
  });

  blocks.forEach((b) => {
    if (b === "") return null;
  });

  return "TIE";
}
