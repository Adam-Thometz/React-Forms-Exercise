import React, {useState} from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState([])

  const addTodo = ({id, todo}) => {
    setTodos(todos => [...todos, {id, todo}])
  }

  const removeTodo = id => {
    setTodos(todos => todos.filter(t => t.id !== id))
  }

  const editTodo = (id, edited) => {
    setTodos(todos => todos.map(
      todo => todo.id === id ? {...todo, todo: edited} : todo
    ))
  }

  return (
    <div className="TodoList">
      <NewTodoForm handleAdd={addTodo} />
      {todos.map(t =>
        <Todo
          key={t.id}
          id={t.id}
          todo={t.todo}
          remove={removeTodo}
          edit={editTodo} />)}
    </div>
  )
}

export default TodoList