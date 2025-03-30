import { useState } from "react";
import Player from "./Component/Player";
import GameBoard from "./Component/GameBoard";
import Log from "./Component/Log";
import { WINNING_COMBINATIONS } from "./winning_combinations";
import GameOver from "./Component/GameOver";
import { use } from "react";

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

function driveActivePlayer(gameTurn){
  let currentPlayer = 'X';
  if(gameTurn.length > 0 && gameTurn[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;

}

function App() {
  const[players, setPlayers] = useState({
    X: 'Player1',
    O: 'Player2',
  });
  const [gameTurn, setGameTurn] = useState([]);
  //const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState('X');


  const activePlayer = driveActivePlayer(gameTurn);
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for(const turn of gameTurn){
      const { square, player} = turn;
      const { row, col} = square;

      gameBoard[row][col] = player;
  }

  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];


    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare){
      winner = players[firstSquare];
    }
  }

  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
   // setActivePlayer((curActivePlayer) =>  curActivePlayer === 'X'? 'O' : 'X');
    setGameTurn(prevTurns => {

      const currentPlayer = driveActivePlayer(prevTurns);

      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurns];

      return updatedTurns;

    });
  }

  function handleRestart(){
    setGameTurn([]);
  }


  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {...prevPlayers, [symbol]: newName };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player name="Player 2" symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurn}/>
    </main>
  )
}

export default App
