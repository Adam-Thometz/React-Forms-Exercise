import React, {useState} from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

const BoxList = () => {
  const [boxes, setBoxes] = useState([])

  const addBox = ({id, color, width, height}) => {
    setBoxes(boxes => [...boxes, {id, color, width, height}])
  }
  const removeBox = id => {
    setBoxes(boxes => boxes.filter(b => b.id !== id))
  }

  return (
    <div className="BoxList">
      <NewBoxForm addBox={addBox} />
      {boxes.map(b => 
        <Box key={b.id} id={b.id} width={b.width} height={b.height} color={b.color} handleRemove={removeBox} />)}
    </div>
  )
}

export default BoxList