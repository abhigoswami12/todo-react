import React from "react";

class AllTodos extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <ul>
        {this.props.showTodos.map((todo, index) => {
          return (
            <li key={todo.id}>
              <input
                className="input-checkbox"
                type="checkbox"
                name="isDone"
                id=""
                checked={todo.isDone}
                onChange={event => this.props.handleisDone(todo.id, event)}
              />
              <p className={todo.isDone ? "para-target strike" : "para-target"}>
                {todo.text}
              </p>
              <span
                className="span"
                onClick={event => this.props.handleDelete(todo.id, event)}
              >
                X
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
}
export default AllTodos;
