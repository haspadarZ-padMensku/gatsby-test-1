import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

const pageStyles = {
  color: "#232129",
  padding: 16,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const IndexPage: React.FC<PageProps> = () => {
  const [todoList, setTodoList] = React.useState<Todo[]>([]);

  async function loadTodos() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setTodoList(json as Todo[]))
      .catch((error) => console.error(error));
  }

  return (
    <main style={pageStyles}>
      {Boolean(todoList.length) && <h3>TODO:</h3>}
      <button
        className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
        onClick={loadTodos}
      >
        Load todos
      </button>
      <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
        {todoList.map((todoItem) => (
          <div
            key={todoItem.id}
            className={`rounded-md border-slate-600 p-8 shadow-md ${todoItem.completed ? "bg-green-400" : "bg-slate-50"}`}
          >
            <div>{todoItem.userId}</div>
            <div>{todoItem.id}</div>
            <div>{todoItem.title}</div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
