import { useEffect, useState } from "react";
import "./TodoApp.css";

interface Todo {
  id: number;
  text: string;
}

const TodoApp = () => {
  // lista de tarefas com estado inicial definido a partir do localStorage
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Erro ao carregar os dados do localStorage:", error);
      return [];
    }
  });

  const [inputValue, setInputValue] = useState("");

  // Salvar tarefas no localStorage sempre que a lista for atualizada
  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
      console.log("Salvando no localStorage:", todos);
    } catch (error) {
      console.error("Erro ao salvar os dados no localStorage:", error);
    }
  }, [todos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app-container">
      <h1 className="title">- Lista de Tarefas -</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          className="input-field"
          placeholder="Adicione uma tarefa..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="add-button">
          ADD
        </button>
      </form>
      {todos.length === 0 ? (
        <p className="empty">Não há tarefas.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              {todo.text}
              <button
                className="delete-button"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoApp;
