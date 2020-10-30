

import React, { PureComponent } from 'react';
import Header from './components/header/Header';
import Card from './components/card/Card';
import GameOver from './components/card/GameOver';


import './styles/main.css';

class App extends PureComponent {
// declaring stateful properties for memory game processing
  state = { 
    //array to hold flipped properties of card ,by default it will be false for all card
    isFlipped: Array(10).fill(false),
    //array to hold identical sets of cards in random order
    shuffledCard: App.duplicateCard(5).sort(() => Math.random() - 0.5),
    //count of card click
    clickCount: 1,
    //hold the card value of previous selected card
    prevSelectedCard: -1,
    //hold card id of previous card
    prevCardId: -1,
    //check if game started or not
    gameStarted:false,
    //
    secondsElapsed:0,
    timerCount:1,
    errorCount:0
  };

  tick() {
		this.setState({
			secondsElapsed: this.state.secondsElapsed + 1,
		})
	};

  static duplicateCard = (range) => {
    var set = [];
    for(var i = 0; i < range; i++){
        set[i]=i;
    }
    return set.reduce((preValue, current, index, array) => {
      return preValue.concat([current, current])
    },[]);
  };

  handleClick = event => {
    event.preventDefault();
    if (this.state.timerCount === 1){
    this.interval = setInterval(() => this.tick(), 1000);
    }
    const cardId = event.target.id;
    const newFlipps = this.state.isFlipped.slice();
    this.setState({
      timerCount: this.state.timerCount + 1
  });
    if (this.state.clickCount === 1)
    {
    this.setState({
        prevSelectedCard: this.state.shuffledCard[cardId],
        prevCardId: cardId
    });
  }

    if (newFlipps[cardId] === false) {
      newFlipps[cardId] = !newFlipps[cardId];
      this.setState(prevState => ({ 
        isFlipped: newFlipps,
        clickCount: this.state.clickCount + 1
      }));

      if (this.state.clickCount === 2) {
        this.setState({ clickCount: 1 });
        const prevCardId = this.state.prevCardId;
        const newCard = this.state.shuffledCard[cardId];
        const previousCard = this.state.prevSelectedCard;

        this.isCardMatch(previousCard, newCard, prevCardId, cardId);
      }
    }
  };

  isCardMatch = (card1, card2, card1Id, card2Id) => {
       if (card1 === card2) {
      const hideCard = this.state.shuffledCard.slice();
      hideCard[card1Id] = -1;
      hideCard[card2Id] = -1;
      setTimeout(() => {
        this.setState(prevState => ({
          shuffledCard: hideCard
        }))
      }, 1000);
    } 
    else {
      const flipBack = this.state.isFlipped.slice();
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      this.setState({
      errorCount: this.state.errorCount+1
    });
      setTimeout(() => {
        this.setState(prevState => ({ isFlipped: flipBack }));
      }, 1000);
    }
  };

  restartGame = () => {
    this.setState({
      isFlipped: Array(10).fill(false),
      shuffledCard: App.duplicateCard(5).sort(() => Math.random() - 0.5),
      clickCount: 1,
      prevSelectedCard: -1,
      prevCardId: -1,
      gameStarted:false,
      secondsElapsed:0,
      timerCount:1,
      errorCount:0

      
    });
    clearInterval(this.interval);
  };

  isGameOver = () => {
    return this.state.isFlipped.every((element, index, array) => element !== false);
  };

  formatBoard=(gameID)=> {
    var cardcount=5;
    switch (gameID) {
      case '2':
        cardcount=10;
        break;
      case '3':
        cardcount=25;
        break;
      default:
        break;
    }
    var flippedCpunt=cardcount*2;
			this.setState({
        gameStarted:true,
        isFlipped: Array(flippedCpunt).fill(false),
        shuffledCard: App.duplicateCard(cardcount).sort(() => Math.random() - 0.5)
    })
  };
  render() {

    
    return (
      
     <div>
       <div style={this.state.gameStarted ? {display: 'none'} : {display: 'block'}}>
       <h3 >Memory Game</h3>
       <h3>Please select a game difficulty</h3>
       <p><button className="w3-button w3-red" style={{width:'150px'}} onClick={() => this.formatBoard('1')}>Easy</button></p>
       <p><button className="w3-button w3-red" style={{width:'150px'}}  onClick={() => this.formatBoard('2')}>Medium</button></p>
       <p><button className="w3-button w3-red" style={{width:'150px'}}  onClick={() => this.formatBoard('3')}>Difficult</button></p>
				</div>
      <div style={this.state.gameStarted ? {display: 'block'} : {display: 'none'}} >
       <Header restartGame={this.restartGame} secondsElapsed={this.state.secondsElapsed} errorCount={this.state.errorCount} />
       { this.isGameOver() ? <GameOver restartGame={this.restartGame} /> :
       
       <div className="grid-container">
          {
            this.state.shuffledCard.map((cardNumber, index) => 
            <div className={cardNumber===-1?"hide-card":""}>
              <Card
                id={index} 
                cardNumber={cardNumber} 
                isFlipped={this.state.isFlipped[index]} 
                handleClick={this.handleClick}     
              />
              </div>
            )
          }
        </div>
       }</div>
     </div>
    );
  }
}

export default App;
