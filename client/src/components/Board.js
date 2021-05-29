import "./Board.css";

function Board(props) {
  const { blocks, disabled, onMove } = props;

  return (
    <div id="Board" className={disabled && "disabled"}>
      <button
        className="square remove-top-border remove-left-border"
        disabled={disabled}
        onClick={() => onMove(0)}
      >
        {blocks[0]}
      </button>
      <button
        className="square remove-top-border"
        disabled={disabled}
        onClick={() => onMove(1)}
      >
        {blocks[1]}
      </button>
      <button
        className="square remove-top-border remove-right-border"
        disabled={disabled}
        onClick={() => onMove(2)}
      >
        {blocks[2]}
      </button>
      <button
        className="square remove-left-border"
        disabled={disabled}
        onClick={() => onMove(3)}
      >
        {blocks[3]}
      </button>
      <button className="square" disabled={disabled} onClick={() => onMove(4)}>
        {blocks[4]}
      </button>
      <button
        className="square remove-right-border"
        disabled={disabled}
        onClick={() => onMove(5)}
      >
        {blocks[5]}
      </button>
      <button
        className="square remove-bottom-border remove-left-border"
        disabled={disabled}
        onClick={() => onMove(6)}
      >
        {blocks[6]}
      </button>
      <button
        className="square remove-bottom-border"
        disabled={disabled}
        onClick={() => onMove(7)}
      >
        {blocks[7]}
      </button>
      <button
        className="square remove-bottom-border remove-right-border"
        disabled={disabled}
        onClick={() => onMove(8)}
      >
        {blocks[8]}
      </button>
    </div>
  );
}

export default Board;
