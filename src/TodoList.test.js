import { render, fireEvent, waitFor } from '@testing-library/react';
import TodoList from './TodoList';

const addTodo = async (todoList) => {
  const todoInput = todoList.getByLabelText("New Todo")
  const submitBtn = todoList.getByText("Create Todo")

  await waitFor(() => {
    fireEvent.change(todoInput, {target: {value: "buy a bucket"}})
    fireEvent.click(submitBtn)
  })
}

it('renders without crashing', () => {
  render(<TodoList />);
});

it('matches snapshot', () => {
  const {asFragment} = render(<TodoList />)
  expect(asFragment()).toMatchSnapshot()
});

it("can add a new todo", async () => {
  const todoList = render(<TodoList />)
  await addTodo(todoList)

  expect(todoList.getByText("buy a bucket")).toBeInTheDocument()
  expect(todoList.getByText("Edit")).toBeInTheDocument()
  expect(todoList.getByText("Remove")).toBeInTheDocument()
})

it("can remove a todo", async () => {
  const todoList = render(<TodoList />)
  await addTodo(todoList)

  const removeBtn = todoList.getByText("Remove")
  fireEvent.click(removeBtn)
  expect(removeBtn).not.toBeInTheDocument()
})

it("can edit a new todo", async () => {
  const todoList = render(<TodoList />)
  await addTodo(todoList)
  
  const editBtn = todoList.getByText("Edit")
  fireEvent.click(editBtn)

  const editInput = todoList.getByDisplayValue("buy a bucket")
  await waitFor(() => {
    fireEvent.change(editInput, {target: {value: 'write tests'}})
    fireEvent.click(todoList.getByText('Update'))
  })
  
  expect(todoList.getByText('write tests')).toBeInTheDocument()
  expect(todoList.getByText('buy a bucket')).not.toBeInTheDocument()
})