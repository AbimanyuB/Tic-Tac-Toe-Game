export default function Log({ gameTurns }) {
  return (
    <ol id="log">
      {gameTurns.map((turn) => (
        <li
          key={`${turn?.board?.row}-${turn?.board?.column}`}
        >{`${turn?.player} selected ${turn?.board?.row}-${turn?.board?.column}`}</li>
      ))}
    </ol>
  );
}
