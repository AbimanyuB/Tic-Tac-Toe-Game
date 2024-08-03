import { useState } from "react";

import GameBoard from "./components/GameBoard/GameBoard.jsx";
import Player from "./components/Player/Player.jsx";
import Log from "./components/Log/Log.jsx";

import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function handleActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerGameName, setPlayerGameName] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const activePlayer = handleActivePlayer(gameTurns);
  const gameBoard = [...initialGameBoard.map((array) => [...array])];
  let winner;

  for (const turn of gameTurns) {
    const { board, player } = turn;
    const { row, column } = board;

    gameBoard[row][column] = player;
  }

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    )
      winner = playerGameName[firstSquareSymbol];
  }

  const draw = gameTurns.length === 9 && !winner;

  const handleSelectGameBoard = (rowIndex, columnIndex) => {
    setGameTurns((prevGameTurn) => {
      const currentPlayer = handleActivePlayer(prevGameTurn);
      const updatedGameTurns = [
        {
          board: { row: rowIndex, column: columnIndex },
          player: currentPlayer,
        },
        ...prevGameTurn,
      ];

      return updatedGameTurns;
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
  };

  const handleChangeName = (symbol, changeName) => {
    setPlayerGameName((prevPlayerGameName) => {
      return { ...prevPlayerGameName, [symbol]: changeName };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            activePlayer={activePlayer}
            onChangeName={handleChangeName}
          />
          <Player
            name="Player 2"
            symbol="O"
            activePlayer={activePlayer}
            onChangeName={handleChangeName}
          />
        </ol>
        <GameBoard
          onSelectGameBoard={handleSelectGameBoard}
          gameBoard={gameBoard}
        />
        {(winner || draw) && (
          <GameOver winner={winner} draw={draw} onRematch={handleRestart} />
        )}
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
