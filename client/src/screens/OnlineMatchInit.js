import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./OnlineMatchInit.css";

function OnlineMatchInit(props) {
  const history = useHistory();

  useEffect(() => {
    const matchID = generateID();
    history.push(`/online/${matchID}`);
  }, []);

  function generateID() {
    const possible =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";

    let res = "";
    for (let i = 0; i < 5; ++i)
      res += possible.charAt(Math.floor(Math.random() * possible.length));

    return res;
  }

  return (
    <div id="OnlineMatchInit" className="screen">
      <h1>Initiating Online Match...</h1>
    </div>
  );
}

export default OnlineMatchInit;
