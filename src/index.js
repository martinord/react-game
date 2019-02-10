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
class Square extends React.Component {
  render() {    // When this component is 'rendered', it returns a 'description' of what it's shown
                // The sintax used here is called JSX, and it will be built with Babel, and translated to code.
    return (
      <button className="square">
        {this.props.value} 
      </button>
    );            // The output of this function, is a React element or a 'description'
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i}/>;     // Uses a React component defined before,
  }                                 // with argument value = the value of i

  render() {
    const status = 'Next player: X';

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
