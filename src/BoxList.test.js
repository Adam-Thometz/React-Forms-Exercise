import { render, fireEvent, waitFor } from '@testing-library/react';
import BoxList from './BoxList';

const addBox = async (boxList, color = "blue", height = "100", width = "200") => {
  const colorInput = boxList.getByLabelText("Color")
  const heightInput = boxList.getByLabelText("Height")
  const widthInput = boxList.getByLabelText("Width")
  const submitBtn = boxList.getByText("Create Box")
  
  await waitFor(() => {
    fireEvent.change(colorInput, {target: {value: color}})
    fireEvent.change(heightInput, {target: {value: height}})
    fireEvent.change(widthInput, {target: {value: width}})
    fireEvent.click(submitBtn)
  })
}

it('renders without crashing', () => {
  render(<BoxList />);
});

it('matches snapshot', () => {
  const {asFragment} = render(<BoxList />)
  expect(asFragment()).toMatchSnapshot()
});

it("can add a new box", async () => {
  const boxList = render(<BoxList />)
  expect(boxList.queryByText("Remove")).not.toBeInTheDocument()

  await addBox(boxList)

  const removeBtn = boxList.getByText("Remove")
  expect(removeBtn).toBeInTheDocument()
  expect(removeBtn.previousSibling).toHaveStyle(`
    backgroundColor: blue;
    height: 100px;
    width: 200px;
  `)
})

it("can remove a box", async () => {
  const boxList = render(<BoxList />)
  await addBox(boxList)

  const removeBtn = boxList.getByText("Remove")
  fireEvent.click(removeBtn)
  expect(removeBtn).not.toBeInTheDocument()
})