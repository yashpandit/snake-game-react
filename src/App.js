import React, {Component} from 'react';
import Snake from './Snake';
import Food from './Food';
import Score from './Score';

/**
 * this will cause the food to appear at random positions within the wall
 */
const getRandomFoodPosition = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * max + min) / 2) * 2;
  let y = Math.floor((Math.random() * max + min) / 2) * 2;
  return [x, y];
}

/**
 * describes the initial state of the app
 */
const initialState = {
  foodPosition: getRandomFoodPosition(),
  isStartGame: false,
  score: 0,
  speed: 200,
  direction: 'RIGHT',
  snakePosition: [
    [0, 0],
    [2, 0]
  ]
}

let interval;
let highScore = (localStorage.getItem("highScore")) ? localStorage.getItem("highScore") : 0;

class App extends Component{

  state = initialState;

  componentDidUpdate() {
    this.updateHighScore();
    this.onWallCollision();
    this.onSelfCollision();
    this.onEat();
  }

  /**
   * this will change the direction of the snake based on the arrow key pressed
   */
  onKeyDown = (e) => {
    e = e || window.event;
    switch(e.keyCode) {
      case 37:
        this.setState((prevState, props) => {
          return (prevState.direction === 'RIGHT') ? { direction: 'RIGHT' } : { direction: 'LEFT' }
        });
        break;
      case 38:
        this.setState((prevState, props) => {
          return (prevState.direction === 'DOWN') ? { direction: 'DOWN' } : { direction: 'UP' }
        });
        break;
      case 39:
        this.setState((prevState, props) => {
          return (prevState.direction === 'LEFT') ? { direction: 'LEFT' } : { direction: 'RIGHT' }
        });
        break;
      case 40:
        this.setState((prevState, props) => {
          return (prevState.direction === 'UP') ? { direction: 'UP' } : { direction: 'DOWN' }
        });
        break;
      default:
        break;
    }
  }

  /**
   * this will move the snake based on the direction
   */
  moveSnake = () => {
    let position = [...this.state.snakePosition];
    let head = position[position.length - 1];
    
    switch(this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      default:
        break;
    }

    position.push(head);
    position.shift();
    this.setState({
      snakePosition: position
    });
  }

  /**
   * start the snake movement as soon as the user clicks on start game button
   */
  onStartGame = () => {
    interval = setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
    this.setState({
      isStartGame: true
    });
  }

  /**
   * this method will determine what happens when the snake collides with itself
   */
  onSelfCollision = () => {
    let position = [...this.state.snakePosition];
    let head = position[position.length - 1];

    position.pop();
    position.forEach( dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  }

  /**
   * this method will determine what happens when the snake collides with the wall
   */
  onWallCollision = () => {
    let head = this.state.snakePosition[this.state.snakePosition.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  /**
   * when the snake eats the food, get new food position, increase snake's length and increase the speed
   */
  onEat = () => {
    let head = this.state.snakePosition[this.state.snakePosition.length - 1];
    let food = this.state.foodPosition;
    
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        foodPosition: getRandomFoodPosition(),
        score: this.state.score + 1
      });
      this.growSnake();
    }
  }

  /**
   * updates the high score
   */
  updateHighScore = () => {
    let {score} = this.state;
    if (score > highScore) {
      highScore = score;
      localStorage.highScore = highScore;
    }
  }

  /**
   * increase the snake length
   */
  growSnake = () => {
    let snake = [...this.state.snakePosition];
    snake.unshift([]);
    this.setState({
      snakePosition: snake
    });
  }

  /**
   * when snake either collides with itself or the wall, it's game over
   */
  onGameOver = () => {
    alert(`Game Over`);
    clearInterval(interval);
    this.setState(initialState);
  }

  render() {
    return (
      (!this.state.isStartGame) 
        ? <div className = "container">
            <button 
              onClick = {this.onStartGame} 
              className = "startButton">Start Game</button>
          </div>
        : <div className = "container">
            <Score 
              score = {this.state.score}
              highScore = {highScore} />
            <div className = "wall">
              <Snake snakePosition = {this.state.snakePosition} />
              <Food foodPosition = {this.state.foodPosition} />
            </div>
          </div>
    );
  }
}

export default App;
