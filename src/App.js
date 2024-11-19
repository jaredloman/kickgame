import React from 'react';
import './App.css';

function App() {
  const startGame = () => {
    console.log('Game Started!');
    // Add logic to start the game here
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Game</h1>
        <button onClick={startGame} className="start-button">
          Start Game
        </button>
      </header>
    </div>
  );
}

export default App;
