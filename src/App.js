import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetNumber, setTargetNumber] = useState(null); 
  const [userGuess, setUserGuess] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [gameOver, setGameOver] = useState(false); 

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(randomNumber);
    setUserGuess('');
    setMessage('Угадайте число от 1 до 100');
    setGameOver(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const guess = parseInt(userGuess);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setMessage('Пожалуйста, введите число от 1 до 100');
      return;
    }

    if (guess === targetNumber) {
      setMessage(`Вы угадали число`);
      setGameOver(true);
    } else if (guess < targetNumber) {
      setMessage('Число меньше загаданного');
    } else {
      setMessage('Число больше загаданного');
    }
    setUserGuess('');
  };

  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Игра - Угадай число</h1>
        
        <div className="game-container">
          <p className="message">{message}</p>
          
          {!gameOver ? (
            <form onSubmit={handleSubmit} className="guess-form">
              <input
                type="number"
                value={userGuess}
                onChange={handleInputChange}
                placeholder="Введите число от 1 до 100"
                min="1"
                max="100"
                className="guess-input"
              />
              <button type="submit" className="guess-button">
                Проверить
              </button>
            </form>
          ) : (
            <button onClick={startNewGame} className="new-game-button">
              Новая игра
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
