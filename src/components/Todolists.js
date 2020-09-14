import React from "react";

class TodoLists extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [],
      activeTab: "all",
      counter: 0
    };
  }

  render() {
    console.log(this.state.todos, "render");

    let showTodos = [];

    switch (this.state.activeTab) {
      case "all":
        showTodos = this.state.todos;
        break;
      case "completed":
        showTodos = this.state.todos.filter(todo => todo.isDone);
        break;
      case "active":
        showTodos = this.state.todos.filter(todo => !todo.isDone);
        break;

      default:
        showTodos = this.state.todos;
        break;
    }

    return (
      <>
        <div className="drop-down-flex">
          <i
            className="fas fa-chevron-down drop-down-menu"
            onClick={event => {
              if (this.state.counter === 0) {
                console.log("enter");
                showTodos.forEach(todo => {
                  if (!todo.isDone) {
                    todo.isDone = true;
                  }
                });
                this.state.counter = this.state.counter + 1;
                console.log(this.state.counter);
              } else {
                console.log("entered");
                showTodos.forEach(todo => {
                  todo.isDone = !todo.isDone;
                });
                this.state.counter = 0;
              }
              localStorage.setItem("todos", JSON.stringify(this.state.todos));
              this.setState({ todos: this.state.todos });
            }}
          ></i>
          {console.log("counter", this.state.counter)}
          <input
            type="text"
            placeholder="write something"
            className="text-input"
            onKeyUp={event => {
              if (event.keyCode === 13) {
                const text = event.target.value;
                const todo = {
                  text: text,
                  isDone: false
                };
                const updatedTodos = this.state.todos;
                updatedTodos.push(todo);
                localStorage.setItem("todos", JSON.stringify(this.state.todos));

                this.setState({ todos: updatedTodos });
                event.target.value = "";
              }
            }}
          />
        </div>
        <ul>
          {showTodos.map((todo, index) => {
            return (
              <li>
                <input
                  className="input-checkbox"
                  type="checkbox"
                  name="isDone"
                  id=""
                  checked={todo.isDone}
                  data-id={index}
                  onClick={event => {
                    const id = event.target.dataset.id;
                    this.state.todos[id].isDone = !this.state.todos[id].isDone;
                    localStorage.setItem(
                      "todos",
                      JSON.stringify(this.state.todos)
                    );
                    this.setState({ isDone: this.state.todos[id].isDone });
                    console.log(this.state.todos[id].isDone);
                  }}
                />
                <p className="para-target">{todo.text}</p>
                <span
                  className="span"
                  data-id={index}
                  onClick={event => {
                    const id = event.target.dataset.id;
                    this.state.todos.splice(id, 1);
                    localStorage.setItem(
                      "todos",
                      JSON.stringify(this.state.todos)
                    );
                    this.setState({ todos: this.state.todos });
                  }}
                >
                  X
                </span>
              </li>
            );
          })}
        </ul>
        <footer>
          <span className="item">
            {showTodos.filter(todo => !todo.isDone).length} items left
          </span>
          <button
            className="all"
            onClick={event => {
              this.setState({ activeTab: "all" });
            }}
          >
            All
          </button>
          <button
            className="completed"
            onClick={event => {
              this.setState({ activeTab: "completed" });
            }}
          >
            Completed
          </button>
          <button
            className="active"
            onClick={event => {
              this.setState({ activeTab: "active" });
            }}
          >
            Active
          </button>
          <button className="clear">
            <a
              className="anchor"
              href="#"
              onClick={event => {
                const updatedTodos = this.state.todos.filter(
                  todo => !todo.isDone
                );
                localStorage.setItem("todos", JSON.stringify(updatedTodos));
                this.setState({ todos: updatedTodos });
              }}
            >
              Clear Completed
            </a>
          </button>
        </footer>
      </>
    );
  }
}

export default TodoLists;
