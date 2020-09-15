import React from "react";

class Input extends React.Component {
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
          onChange={this.props.handleInputTextValue}
          onKeyUp={this.props.addTodo}
          value={this.props.inputText}
        />
      </div>
    );
  }
}
export default Input;
