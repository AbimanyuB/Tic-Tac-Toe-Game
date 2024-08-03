import { useState } from "react";

export default function Player({ name, symbol, activePlayer, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  const handleButtonClick = () => {
    setIsEditing((editing) => !editing);

    if (isEditing) onChangeName(symbol, playerName);
  };

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  let showPlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    showPlayerName = (
      <input type="text" value={playerName} onChange={handleNameChange} />
    );
  }

  return (
    <li className={activePlayer === symbol ? "active" : undefined}>
      <span className="player">
        {showPlayerName}
        {<span className="player-symbol">{symbol}</span>}
      </span>
      <button onClick={handleButtonClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
