import React from "react";
import Input from "./Input";
import AllTodos from "./AllTodos";
import Footer from "./Footer";

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
      const text = event.target.value;
      const todo = {
        text: text,
        isDone: false
      };
      const updatedTodos = this.state.todos;
      updatedTodos.push(todo);

      this.setState({ todos: updatedTodos, inputText: "" }, () =>
        localStorage.setItem("todos", JSON.stringify(this.state.todos))
      );
      // event.target.value = "";
    }
  };

  handleSelectAll = event => {
    if (this.state.counter === 0) {
      console.log("enter");
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

  handleisDone = event => {
    const id = event.target.dataset.id;
    // let todos = this.state.todos;
    // let todo = todos.find((todo,index) => todo.index === id);

    // todo = {...todo,isDone:!todo.isDone};
    // todos = [...todos]

    // this.setState({ isDone: !this.state.todos[id].isDone });
    let updatedTodos = this.state.todos;
    updatedTodos[id].isDone = !updatedTodos[id].isDone;
    // this.setState({ isDone: this.state.todos[id].isDone });
    this.setState({ todos: updatedTodos }, () =>
      localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  };

  handleDelete = event => {
    const id = event.target.dataset.id;
    this.state.todos.splice(id, 1);
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
    this.setState({ todos: this.state.todos }, () =>
      localStorage.setItem("todos", JSON.stringify(this.state.todos))
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
