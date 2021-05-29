import { Link } from "react-router-dom";
import "./Home.css";

function Home(props) {
  return (
    <div id="Home" className="screen">
      <h1>Tic Tac Toe WebSockets</h1>
      <em>A Tic Tac Toe game built using WebSockets</em>

      <div className="buttons">
        <Link className="btn big-btn new-match" to="/new">
          Start New Match
        </Link>
        <Link className="btn big-btn join-match" to="/join">
          Join a Match
        </Link>
      </div>
    </div>
  );
}

export default Home;
