import React from "react";
import './Box.css'

const Box = ({width, height, color, id, handleRemove}) => {
  const remove = () => handleRemove(id)
  return (
    <div className="Box" id={id}>
      <div style={{
        backgroundColor: color,
        width: `${width}px`,
        height: `${height}px`
      }} data-testid="box">
        
      </div>
      <button onClick={remove}>Remove</button>
    </div>
  )
}

export default Box