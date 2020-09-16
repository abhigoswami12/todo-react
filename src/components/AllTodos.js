import React from "react";

function AllTodos(props) {
  return (
    <ul>
      {props.showTodos.map((todo, index) => {
        return (
          <li key={todo.id}>
            <input
              className="input-checkbox"
              type="checkbox"
              name="isDone"
              id=""
              checked={todo.isDone}
              onChange={event => props.handleisDone(todo.id, event)}
            />
            <p className={todo.isDone ? "para-target strike" : "para-target"}>
              {todo.text}
            </p>
            <span
              className="span"
              onClick={event => props.handleDelete(todo.id, event)}
            >
              X
            </span>
          </li>
        );
      })}
    </ul>
  );
}
export default AllTodos;
