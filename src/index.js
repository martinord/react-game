import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// NOTES
// React component subclasses are going to be used as a
// DOM tag: <Square />, for example. Like when we use
// HTML DOM tags as <a href="URL">Mylink</a>
// In this case, 'href' is the parameter we pass to 'a'
// In a react component, we pass the parameters the same way,
// and we access them as an argument in the object called props
// for example: this.props.href

// render() --> output a 'description'
// When a component is 'rendered', it returns a 'description' of what it's shown
// The sintax used here is called JSX, and it will be built with Babel, and translated to code.

// In order to "remember things", React Components use the 'this.state'
// as a private parameter. A constructor is used to initialize this argument

// ---------------------------------------------------------------------------------------------- //

// Square is now written as a function component, as the component only had a render method
// Note: props.onClick is a function -- notice the lack of parenthesis
function Square(props){
  return(
    <button className="square" onClick ={props.onClick}>
      {props.value}
    </button>
  );
}

// NOTE: in 'onClick', arrow syntax for defining a function is used (to be able to access
// the object as 'this')
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),    // We will store the state of the game in board and not in each
      xIsNext: true,                   // square. Information will flow from children to parent through props
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();   // Make a copy of the squares array, to implement inmutability of them
                                                  // element we want to change. Then, replace the element with the modified copy
                                                  // This will create a pure React element, helping to know when to re-render.

    // Ignore a click if someone won the game or if the square is filled already
    if (calculateWinner(squares) || squares[i])
      return;

    squares[i] = (this.state.xIsNext ? 'X' : 'O');
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext      // Flip value. Change player
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )    // 'value' and 'onClick' properties are passed to the Square element
         // It is accessed the current state of the board. The 'onClick' property will give
         // each sqare a function that can call to update the board without need to access the
        // private argument 'state'
  }

  // Calculate the winner in each re-render
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner){
      status = 'Winner: ' + winner;
    } else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


// ========================================
// Extra functions
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
