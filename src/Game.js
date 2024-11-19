import React, { useState, useEffect, useCallback } from 'react';
import './Game.css';

const Game = () => {
  const [objects, setObjects] = useState([]);
  const [score, setScore] = useState(0);
  const [kickbotPosition, setKickbotPosition] = useState(50);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setObjects((prevObjects) => [
        ...prevObjects,
        createNewObject(),
      ]);
    }, 1000);

    const fallInterval = setInterval(() => {
      setObjects((prevObjects) =>
        prevObjects.map((obj) => ({
          ...obj,
          top: obj.top + 5,
        }))
      );
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(fallInterval);
    };
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const checkObjects = () => {
      setObjects((prevObjects) => {
        const newObjects = prevObjects.filter((obj) => {
          if (obj.top >= 400) {
            setGameOver(true);
            return false;
          }
          return true;
        });
        return newObjects;
      });
    };

    const interval = setInterval(checkObjects, 100);
    return () => clearInterval(interval);
  }, [gameOver]);

  const createNewObject = () => {
    return {
      id: Date.now(),
      left: Math.random() * 100,
      top: 0,
    };
  };

  const kickObject = (id) => {
    setObjects((prevObjects) => prevObjects.filter((obj) => obj.id !== id));
    setScore((prevScore) => prevScore + 1);
  };

  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  const handleMouseMove = useCallback(throttle((e) => {
    const gameArea = document.querySelector('.game-area');
    if (gameArea) {
      const rect = gameArea.getBoundingClientRect();
      const position = ((e.clientX - rect.left) / rect.width) * 100;
      setKickbotPosition(position);
    }
  }, 50), []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  const restartGame = () => {
    setObjects([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="game">
      <h1>Kick Game</h1>
      <p>Score: {score}</p>
      {gameOver ? (
        <div>
          <p>Game Over!</p>
          <button onClick={restartGame}>Restart</button>
        </div>
      ) : (
        <div className="game-area">
          {objects.map((obj) => (
            <div
              key={obj.id}
              className="object"
              style={{ left: `${obj.left}%`, top: `${obj.top}px` }}
              onClick={() => kickObject(obj.id)}
            >
              ⚽
            </div>
          ))}
          <div
            className="kickbot"
            style={{ left: `${kickbotPosition}%` }}
          >
            👟
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
