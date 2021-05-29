import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./JoinMatch.css";

function JoinMatch(props) {
  const [input, setInput] = useState("");
  const history = useHistory();

  const onSubmit = (event) => {
    if (input.length !== 5) return false;
    history.push(`/online/${input}`);
  };

  const onChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div id="JoinMatch" className="screen">
      <h1>Join a Match</h1>
      <em>
        Join an online match and play against your friend or watch them play!
      </em>

      <form onSubmit={onSubmit}>
        <input
          id="matchID-input"
          type="text"
          placeholder="Enter MatchID (eg. 0-Dx_)"
          required
          minLength={5}
          maxLength={5}
          onChange={onChange}
        />
        <button type="submit" className="btn big-btn join">
          Join
        </button>
      </form>
      <Link className="btn big-btn back" to="/">
        Return Home
      </Link>
    </div>
  );
}

export default JoinMatch;
