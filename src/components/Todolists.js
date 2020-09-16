import React from "react";
import Input from "./Input";
import AllTodos from "./AllTodos";
import Footer from "./Footer";

import { v4 as uuid } from "uuid";

class TodoLists extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: "",
      todos: localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [],
      activeTab: "all",
      counter: 0
    };
  }

  showTodos = () => {
    let showTodos = [];
    switch (this.state.activeTab) {
      case "all":
        showTodos = this.state.todos;
        return showTodos;

      case "completed":
        showTodos = this.state.todos.filter(todo => todo.isDone);
        return showTodos;

      case "active":
        showTodos = this.state.todos.filter(todo => !todo.isDone);
        return showTodos;

      default:
        showTodos = this.state.todos;
        return showTodos;
    }
  };

  addTodo = event => {
    if (event.keyCode === 13) {
      if (event.target.value.trim()) {
        const text = event.target.value;
        const todo = {
          text: text,
          isDone: false,
          id: uuid()
        };
        this.setState(
          { todos: this.state.todos.concat(todo), inputText: "" },
          () => localStorage.setItem("todos", JSON.stringify(this.state.todos))
        );
      }
    }
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

  handleInputTextValue = event => {
    const inputText = event.target.value;
    this.setState({ inputText: inputText });
  };

  handleisDone = (id, event) => {
    let todo = this.state.todos.find(todo => todo.id === id);
    todo.isDone = !todo.isDone;
    this.setState({ todos: this.state.todos }, () =>
      localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
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
          todos={this.state.todos}
          counter={this.state.counter}
          inputText={this.state.inputText}
          handleSelectAll={this.handleSelectAll}
          handleInputTextValue={this.handleInputTextValue}
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
