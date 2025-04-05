import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1a1a2e;
  color: #ffffff;
  font-family: 'Press Start 2P', cursive;
`;

const GameContainer = styled.div`
  background: linear-gradient(145deg, #16213e, #0f3460);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
  border: 3px solid #e94560;
`;

const Title = styled.h1`
  color: #e94560;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const Instructions = styled.p`
  color: #16cdd6;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 18px;
  background-color: #0f3460;
  border: 2px solid #e94560;
  border-radius: 8px;
  color: #ffffff;
  width: 150px;
  text-align: center;
  outline: none;
`;

const GuessButton = styled.button`
  padding: 15px 30px;
  margin-left: 15px;
  font-size: 18px;
  background-color: #e94560;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff6b6b;
  }
`;

const Message = styled.p<{ isCorrect: boolean }>`
  margin: 20px 0;
  font-size: 1.2rem;
  color: ${(props: { isCorrect: boolean }) => props.isCorrect ? '#4ecca3' : '#e94560'};
`;

const ResetButton = styled.button`
  padding: 12px 25px;
  font-size: 16px;
  background-color: #16cdd6;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2ae9e9;
  }
`;

const App: React.FC = () => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };

  const handleGuess = () => {
    const guessNumber = parseInt(guess, 10);
    if (isNaN(guessNumber)) {
      setMessage('Please enter a valid number.');
      return;
    }
    setAttempts(attempts + 1);
    if (guessNumber < targetNumber) {
      setMessage('Too low! Try again.');
    } else if (guessNumber > targetNumber) {
      setMessage('Too high! Try again.');
    } else {
      setMessage(`Correct! You guessed it in ${attempts + 1} attempts.`);
    }
    setGuess('');
  };

  const handleReset = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('');
    setAttempts(0);
  };

  return (
    <Container>
      <GameContainer>
        <Title>Mystery Number</Title>
        <Instructions>Enter a number between 1 and 100:</Instructions>
        <Input
          type="number"
          value={guess}
          min="1"
          max="100"
          onChange={handleInputChange}
        />
        <GuessButton onClick={handleGuess}>
          Guess
        </GuessButton>
        <Message isCorrect={message.includes('Correct')}>
          {message}
        </Message>
        <ResetButton onClick={handleReset}>
          Reset Game
        </ResetButton>
      </GameContainer>
    </Container>
  );
};

export default App;