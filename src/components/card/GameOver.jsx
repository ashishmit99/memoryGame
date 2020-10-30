import React from 'react';
{/* when game will be over ,this component will handle exit*/}
const GameOver = ({ restartGame }) => (
  <div className="justify-center">
    <h1>Game Over!</h1>
    <h3>If you enjoyed playing this game, follow me < a href='https://www.linkedin.com/in/ashishmit99' target='_blank'>Ashish Kumar</a> for more...</h3>
    <button className="restart-button" onClick={restartGame}>Restart Game</button>
  </div>
);

export default GameOver;