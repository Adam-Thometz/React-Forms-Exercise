import React from "react";
import {useFormik} from 'formik';
import {v4 as uuid} from 'uuid'

const NewTodoForm = ({handleAdd}) => {
  const formik = useFormik({
    initialValues: {
      todo: ''
    },
    onSubmit: values => {
      handleAdd({...values, id: uuid()});
      formik.handleReset()
    }
  })

  return (
    <form
      className="NewTodoForm"
      onSubmit={formik.handleSubmit}  
    >
      <label htmlFor="todo">New Todo</label>
      <input
        type="text"
        id="todo"
        name="todo"
        placeholder="Enter todo here"
        value={formik.values.todo}
        onChange={formik.handleChange}
      />
      <button type="submit">Create Todo</button>
    </form>
  )
}

export default NewTodoForm