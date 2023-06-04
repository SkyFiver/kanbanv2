import React, { useState } from "react";
import "./App.css";

interface Card {
  id: number;
  text: string;
  comments: string[];
}

interface Board {
  [key: string]: Card[];
}

const initialBoard: Board = {
  todo: [],
  inProgress: [],
  testing: [],
  done: []
};

const KanbanBoard: React.FC = () => {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [newCardText, setNewCardText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardText(event.target.value);
  };

  const handleCardAdd = (column: string) => {
    const newCard: Card = {
      id: Date.now(),
      text: newCardText,
      comments: []
    };

    setBoard((prevBoard) => ({
      ...prevBoard,
      [column]: [...prevBoard[column], newCard]
    }));

    setNewCardText("");
  };

  const handleCommentAdd = (column: string, cardId: number) => {
    const comment = prompt("Введите комментарий:") || "";

    setBoard((prevBoard) => {
      const updatedBoard = { ...prevBoard };
      const cardIndex = updatedBoard[column].findIndex(
        (card) => card.id === cardId
      );

      if (cardIndex !== -1) {
        const updatedCard = { ...updatedBoard[column][cardIndex] };
        updatedCard.comments.push(comment);
        updatedBoard[column][cardIndex] = updatedCard;
      }

      return updatedBoard;
    });
  };

  const handleCardDelete = (column: string, cardId: number) => {
    setBoard((prevBoard) => {
      const updatedBoard = { ...prevBoard };
      const cardIndex = updatedBoard[column].findIndex(
        (card) => card.id === cardId
      );

      if (cardIndex !== -1) {
        updatedBoard[column].splice(cardIndex, 1);
      }

      return updatedBoard;
    });
  };

  return (
    <div className="kanban-board">
      <div className="column">
        <h2>To Do</h2>
        {board.todo.map((card) => (
          <div key={card.id} className="card">
            <span>{card.text}</span>
            <button onClick={() => handleCommentAdd("todo", card.id)}>
              Add Comment
            </button>
            <button onClick={() => handleCardDelete("todo", card.id)}>
              Delete
            </button>
            {card.comments.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
          </div>
        ))}
        <input
          type="text"
          value={newCardText}
          onChange={handleInputChange}
          placeholder="Enter a new card"
        />
        <button onClick={() => handleCardAdd("todo")}>Add Card</button>
      </div>

      <div className="column">
        <h2>In Progress</h2>
        {board.inProgress.map((card) => (
          <div key={card.id} className="card">
            <span>{card.text}</span>
            <button onClick={() => handleCommentAdd("inProgress", card.id)}>
              Add Comment
            </button>
            <button onClick={() => handleCardDelete("inProgress", card.id)}>
              Delete
            </button>
            {card.comments.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
          </div>
        ))}
        <input
          type="text"
          value={newCardText}
          onChange={handleInputChange}
          placeholder="Enter a new card"
        />
        <button onClick={() => handleCardAdd("inProgress")}>Add Card</button>
      </div>

      <div className="column">
        <h2>Testing</h2>
        {board.testing.map((card) => (
          <div key={card.id} className="card">
            <span>{card.text}</span>
            <button onClick={() => handleCommentAdd("testing", card.id)}>
              Add Comment
            </button>
            <button onClick={() => handleCardDelete("testing", card.id)}>
              Delete
            </button>
            {card.comments.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
          </div>
        ))}
        <input
          type="text"
          value={newCardText}
          onChange={handleInputChange}
          placeholder="Enter a new card"
        />
        <button onClick={() => handleCardAdd("testing")}>Add Card</button>
      </div>

      <div className="column">
        <h2>Done</h2>
        {board.done.map((card) => (
          <div key={card.id} className="card">
            <span>{card.text}</span>
            <button onClick={() => handleCommentAdd("done", card.id)}>
              Add Comment
            </button>
            <button onClick={() => handleCardDelete("done", card.id)}>
              Delete
            </button>
            {card.comments.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
          </div>
        ))}
        <input
          type="text"
          value={newCardText}
          onChange={handleInputChange}
          placeholder="Enter a new card"
        />
        <button onClick={() => handleCardAdd("done")}>Add Card</button>
      </div>
    </div>
  );
};

export default KanbanBoard;