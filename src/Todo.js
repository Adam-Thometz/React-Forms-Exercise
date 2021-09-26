import React, {useState} from "react";

const Todo = ({todo, id, remove, edit}) => {
  const [editTodo, setEditTodo] = useState(todo)
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => {
    setIsEditing(edit => !edit)
  }

  const handleChange = e => {
    setEditTodo(e.target.value)
  }

  const handleEdit = e => {
    e.preventDefault()
    edit(id, editTodo)
    setIsEditing(false)
  }

  const handleRemove = () => remove(id)
  if (isEditing) {
    return (
      <div>
      <form onSubmit={handleEdit}>
        <input
          type="text"
          placeholder="Edit todo"
          value={editTodo}
          onChange={handleChange}
        />
        <button>Update</button>
      </form>
    </div>
    )
  } else {
    return (
      <div className="Todo" id={id}>
        <h3>{todo}</h3>
        <button onClick={handleRemove}>Remove</button>
        <button onClick={toggleEdit}>Edit</button>
      </div>
    )
  }
}

export default Todo