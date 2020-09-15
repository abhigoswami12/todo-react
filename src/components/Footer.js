import React from "react";

function Footer(props) {
  return (
    <footer>
      <span className="item">
        {props.todosInState.filter(todo => !todo.isDone).length} items left
      </span>
      <button className="all" onClick={props.handleFooterEvents.all}>
        All
      </button>
      <button
        className="completed"
        onClick={props.handleFooterEvents.completed}
      >
        Completed
      </button>
      <button className="active" onClick={props.handleFooterEvents.active}>
        Active
      </button>
      <button className="clear">
        <a
          className="anchor"
          href="##"
          onClick={props.handleFooterEvents.clearCompleted}
        >
          Clear Completed
        </a>
      </button>
    </footer>
  );
}

export default Footer;
