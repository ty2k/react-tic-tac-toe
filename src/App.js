import { useState } from 'react';
import styled from 'styled-components';

const Page = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  h1,
  button.reset {
    margin: 20px 0;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const Button = styled.button`
  font-size: 64px;
  height: 100px;
  width: 100px;

  &.x {
    color: #00178a;
  }

  &.o {
    color: #8a0000;
  }
`;

function App() {
  const [turn, setTurn] = useState('x');
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [gameOver, setGameOver] = useState(false);

  function getText() {
    if (gameOver) {
      return `Game Over: ${turn} Wins`;
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (!board[r][c]) {
          return `Turn: ${turn}`;
        }
      }
    }

    return 'No spaces left. Reset!';
  }

  function handleButton(pos) {
    // Update the board
    const [targetRow, targetCol] = pos;
    const newBoard = [...board];
    newBoard.forEach((row, rowIndex) => {
      if (targetRow === rowIndex) {
        row.forEach((col, colIndex) => {
          if (targetCol === colIndex) {
            newBoard[rowIndex][colIndex] = turn;
          }
        });
      }
    });

    // Check the match patterns
    // Top row
    if (
      newBoard[0][0] === turn &&
      newBoard[0][1] === turn &&
      newBoard[0][2] === turn
    ) {
      return setGameOver(true);
    }

    // Middle row
    if (
      newBoard[1][0] === turn &&
      newBoard[1][1] === turn &&
      newBoard[1][2] === turn
    ) {
      return setGameOver(true);
    }

    // Bottom row
    if (
      newBoard[2][0] === turn &&
      newBoard[2][1] === turn &&
      newBoard[2][2] === turn
    ) {
      return setGameOver(true);
    }

    // Left column
    if (
      newBoard[0][0] === turn &&
      newBoard[1][0] === turn &&
      newBoard[2][0] === turn
    ) {
      return setGameOver(true);
    }

    // Middle column
    if (
      newBoard[0][1] === turn &&
      newBoard[1][1] === turn &&
      newBoard[2][1] === turn
    ) {
      return setGameOver(true);
    }

    // Right column
    if (
      newBoard[0][2] === turn &&
      newBoard[1][2] === turn &&
      newBoard[2][2] === turn
    ) {
      return setGameOver(true);
    }

    // Forward slash
    if (
      newBoard[0][0] === turn &&
      newBoard[1][1] === turn &&
      newBoard[2][2] === turn
    ) {
      return setGameOver(true);
    }

    // Back slash
    if (
      newBoard[0][2] === turn &&
      newBoard[1][1] === turn &&
      newBoard[2][0] === turn
    ) {
      return setGameOver(true);
    }

    // If no win, check for no more free spaces
    let freeSpaces = 0;

    newBoard.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (!newBoard[rowIndex][colIndex]) {
          freeSpaces++;
        }
      });
    });

    setBoard(newBoard);

    if (freeSpaces > 0) {
      if (turn === 'x') setTurn('o');
      if (turn === 'o') setTurn('x');
    }
  }

  function reset() {
    setTurn('x');
    setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setGameOver(false);
  }

  return (
    <Page>
      <StyledDiv>
        <h1>{getText()}</h1>

        {board.map((row, rowIndex) => {
          return (
            <Row key={`row-${rowIndex}`}>
              {row.map((col, colIndex) => {
                return (
                  <Button
                    key={`button-${rowIndex}-${colIndex}`}
                    onClick={() => handleButton([rowIndex, colIndex])}
                    disabled={
                      gameOver || board[rowIndex][colIndex] ? true : false
                    }
                    className={col}
                  >
                    {col}
                  </Button>
                );
              })}
            </Row>
          );
        })}

        <button className={'reset'} onClick={reset}>
          Reset
        </button>
      </StyledDiv>
    </Page>
  );
}

export default App;
