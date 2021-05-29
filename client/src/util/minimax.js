export default function minimax(blocks) {
  let origBoard = Array(9);
  for (let i = 0; i < blocks.length; ++i)
    origBoard[i] = blocks[i] === "" ? i : blocks[i];

  return minimaxRec(origBoard, "O").index;
}

function minimaxRec(newBoard, player) {
  let availSpots = emptyIndices(newBoard);

  if (winning(newBoard, "X")) return { score: -10 };
  else if (winning(newBoard, "O")) return { score: 10 };
  else if (availSpots.length === 0) return { score: 0 };

  let moves = [];

  for (let i = 0; i < availSpots.length; i++) {
    let move = {};
    move.index = newBoard[availSpots[i]];

    newBoard[availSpots[i]] = player;

    //if collect the score resulted from calling minimaxRec on the opponent of the current player
    move.score = minimaxRec(newBoard, player === "O" ? "X" : "O").score;

    //reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  let bestMove;
  // if it is the computer's turn loop over the moves and choose the move with the highest score
  if (player === "O") {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  // else loop over the moves and choose the move with the lowest score
  else {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  // return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}

function emptyIndices(blocks) {
  return blocks.filter((ch) => ch !== "O" && ch !== "X");
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
