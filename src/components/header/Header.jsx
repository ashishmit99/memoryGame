import React from 'react';
import Timer from './Timer';
import Error from './ErrorCount';

 {/* header component which will be container for Timer and ErrorCount component */}

const Header = ({ restartGame ,secondsElapsed,errorCount }) => (
  <div className="grid-header-container">
    {/* Timer section */}
    <div className="justify-left timer">
    <Timer time={secondsElapsed} />
    </div>
     {/* End Timer  section */}
      {/* Error Count section */}
    <div className="justify-center game-status-text">
      <Error errorCount={errorCount}></Error>
    </div>
     {/* End Error Count section */}
      {/* Restart section */}
    <div className="justify-end">
      <button onClick={restartGame} className="restart-button">Restart Game</button>
    </div>
  </div>
);

export default Header;