import React from "react";
import TodoLists from "./components/Todolists";

function App() {
  return (
    <div className="flex-column">
      <h1>Todos</h1>
      <main className="todos">
        <TodoLists />
      </main>
    </div>
  );
}

export default App;
