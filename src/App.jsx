import Player from "./Component/Player";
import GameBoard from "./Component/GameBoard";
function App() {
  

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="Player 1" symbol='X' />
          <Player name="Player 2" symbol='Y' />
        </ol>
        <GameBoard />
      </div>
    </main>
  )
}

export default App
