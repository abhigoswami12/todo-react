import React from "react";
import { v4 as uuid } from "uuid";

class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }

  handleInputTextValue = event => {
    this.setState({ text: event.target.value });
  };

  whenEnterPressed = event => {
    if (event.keyCode === 13) {
      if (event.target.value.trim()) {
        this.props.addTodo({
          text: this.state.text,
          isDone: false,
          id: uuid()
        });
      }
      this.setState({ text: "" });
    }
  };

  render() {
    return (
      <div className="drop-down-flex">
        <i
          className="fas fa-chevron-down drop-down-menu"
          onClick={this.props.handleSelectAll}
        ></i>
        <input
          type="text"
          placeholder="write something"
          className="text-input"
          onChange={this.handleInputTextValue}
          onKeyUp={this.whenEnterPressed}
          value={this.state.text}
        />
      </div>
    );
  }
}
export default Input;
