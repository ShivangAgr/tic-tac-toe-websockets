import { Link } from "react-router-dom";
import "./NewGame.css";

function NewGame(props) {
  return (
    <div id="NewGame">
      <h1>NewGame</h1>
      <em>
        You can play online with a friend, or locally against THE computer
        (Beware! It is not going to be easy...)
      </em>

      <div className="buttons">
        <Link className="btn big-btn vs-computer" to="/local">
          VS Computer (Local)
        </Link>
        <Link className="btn big-btn vs-player" to="/online">
          VS Player (Online)
        </Link>
        <Link className="btn big-btn back" to="/">
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default NewGame;
