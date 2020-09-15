import React from "react";

function AllTodos(props) {
  return (
    <ul>
      {props.showTodos.map((todo, index) => {
        return (
          <li>
            <input
              className="input-checkbox"
              type="checkbox"
              name="isDone"
              id=""
              checked={todo.isDone}
              data-id={index}
              onChange={props.handleisDone}
            />
            <p className="para-target">{todo.text}</p>
            <span className="span" data-id={index} onClick={props.handleDelete}>
              X
            </span>
          </li>
        );
      })}
    </ul>
  );
}
export default AllTodos;
