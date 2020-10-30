import React from 'react';
// import ReactCardFlip from "react-card-flip";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
//Card component ,declaring  properties how do we want flip cards
//front side will be opaque
//back side will have card value

const Card = ({ id, isFlipped, handleClick, cardNumber }) => (
 
  <Flippy
  //flip properties
    flipOnHover={false} // default false
    flipOnClick={true} // default false
    flipDirection="horizontal" // horizontal or vertical
    isFlipped={isFlipped} 
    flipSpeedBackToFront={1} 
    flipSpeedFrontToBack={1} 
    
    style={{ width: '50px', height: '50px' }} 
  >
    <FrontSide onClick={handleClick} id={id}
         style=  {{backgroundColor: '#41669d'}}>
    </FrontSide>
    <BackSide id={id}  onClick={handleClick} style={{ backgroundColor: '#FFFFFF' ,color: 'black'  }}>
          { cardNumber }
    </BackSide>
  </Flippy>
);

export default Card;