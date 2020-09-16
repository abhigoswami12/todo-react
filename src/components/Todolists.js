import React from "react";
import Input from "./Input";
import AllTodos from "./AllTodos";
import Footer from "./Footer";

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

  showTodos = () => {
    let { todos } = this.state;

    switch (this.state.activeTab) {
      case "all":
        todos = this.state.todos;
        return todos;

      case "completed":
        todos = this.state.todos.filter(todo => todo.isDone);
        return todos;

      case "active":
        todos = this.state.todos.filter(todo => !todo.isDone);
        return todos;

      default:
        todos = this.state.todos;
        return todos;
    }
  };
  addTodo = todo => {
    this.setState({ todos: [...this.state.todos, todo] }, () =>
      localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  };

  handleSelectAll = event => {
    if (this.state.counter === 0) {
      this.state.todos.forEach(todo => {
        if (!todo.isDone) {
          todo.isDone = true;
        }
      });
      this.setState({ counter: this.state.counter + 1 });
    } else {
      this.state.todos.forEach(todo => {
        todo.isDone = !todo.isDone;
      });
      this.setState({ counter: 0 });
    }
    this.setState({ todos: this.state.todos }, () =>
      localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  };

  handleisDone = (id, event) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone
          };
        } else {
          return todo;
        }
      })
    });
  };

  handleDelete = (id, event) => {
    this.setState(
      { todos: this.state.todos.filter(todo => todo.id !== id) },
      () => localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  };

  handleAll = event => {
    this.setState({ activeTab: "all" });
  };
  handleCompleted = event => {
    this.setState({ activeTab: "completed" });
  };
  handleActive = event => {
    this.setState({ activeTab: "active" });
  };
  handleClearCompleted = event => {
    const updatedTodos = this.state.todos.filter(todo => !todo.isDone);

    this.setState({ todos: updatedTodos }, () =>
      localStorage.setItem("todos", JSON.stringify(updatedTodos))
    );
  };

  render() {
    const showTodos = this.showTodos();
    return (
      <>
        <Input
          counter={this.state.counter}
          handleSelectAll={this.handleSelectAll}
          addTodo={this.addTodo}
        />
        <AllTodos
          todos={this.state.todos}
          handleisDone={this.handleisDone}
          handleDelete={this.handleDelete}
          showTodos={showTodos}
        />

        <Footer
          todosInState={this.state.todos}
          showTodos={showTodos}
          handleFooterEvents={{
            all: this.handleAll,
            active: this.handleActive,
            completed: this.handleCompleted,
            clearCompleted: this.handleClearCompleted
          }}
        />
      </>
    );
  }
}

export default TodoLists;
