import React, { useState } from 'react';
import './App.css';
import Game from './Game';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="App">
      {gameStarted ? (
        <Game />
      ) : (
        <header className="App-header">
          <h1>Welcome to the Game</h1>
          <button onClick={startGame} className="start-button">
            Start Game
          </button>
        </header>
      )}
    </div>
  );
}

export default App;
