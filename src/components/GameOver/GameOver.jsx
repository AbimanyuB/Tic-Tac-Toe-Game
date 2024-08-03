export default function GameOver({ winner, draw, onRematch }) {
  let renderWinner = <p>It`s a Draw!</p>;
  if (winner && !draw) renderWinner = <p>{winner} You Won!</p>;

  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {renderWinner}
      <p>
        <button onClick={onRematch}>Rematch</button>
      </p>
    </div>
  );
}
