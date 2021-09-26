import React from "react";
import {useFormik} from 'formik';
import {v4 as uuid} from 'uuid'
import './NewBoxForm.css'

const validate = values => {
  const errors = {}
  
  const isColor = (strColor) => {
    const s = new Option().style
    s.color = strColor
    return s.color === strColor.toLowerCase()
  }
  
  if (!values.height) {
    errors.height = "Required"
  } else if (isNaN(parseInt(values.height))) {
    errors.height = "Not a valid number"
  }
  
  if (!values.width) {
    errors.width = "Required"
  } else if (isNaN(parseInt(values.width))) {
    errors.width = "Not a valid number"
  }

  if (!values.color) {
    errors.color = "Required"
  } else if (!isColor(values.color)) {
    errors.color = "Not a valid color"
  }

  return errors
}

const NewBoxForm = ({addBox}) => {
  const formik = useFormik({
    initialValues: {
      width: '',
      height: '',
      color: ''
    },
    onSubmit: values => {
      addBox({...values, id: uuid()});
    }
  })

  return (
    <form 
      className="NewBoxForm"
      onSubmit={formik.handleSubmit}
    >
      <label htmlFor="color">Color</label>
      <input
        type="text"
        id="color"
        name="color"
        placeholder="Enter color"
        value={formik.values.color}
        onChange={formik.handleChange}
      />
      <label htmlFor="width">Width</label>
      <input
        type="text"
        id="width"
        name="width"
        placeholder="width in px"
        value={formik.values.width}
        onChange={formik.handleChange}
      />
      <label htmlFor="height">Height</label>
      <input
        type="text"
        id="height"
        name="height"
        placeholder="height in px"
        value={formik.values.height}
        onChange={formik.handleChange}
      />

      <button>Create Box</button>
    </form>
  )
}

export default NewBoxForm