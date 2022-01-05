import React, { useState } from 'react'

const initInputs = {
  sku: "",
  title: "",
  upc: "",
  description: "",
  imgUrl: ""
}

export default function ListingForm(props){
  const [inputs, setInputs] = useState(initInputs)
  const { addListing } = props

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addListing(inputs)
    setInputs(initInputs)
  }

//   function handleSubmit(e){
//     e.preventDefault()
//     props.submit(inputs, props._id)
//     setInputs(initInputs)
//     // console.log (inputs)
//     if(props.setEditToggle) {
//         props.setEditToggle(false)
//     }
// }

  const { sku, title, upc, description, imgUrl } = inputs
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="sku" 
        value={sku} 
        onChange={handleChange} 
        placeholder="SKU"/>
      <input 
        type="text" 
        name="title" 
        value={title} 
        onChange={handleChange} 
        placeholder="Title"/>
        <input 
        type="text" 
        name="upc" 
        value={upc} 
        onChange={handleChange} 
        placeholder="UPC"/>
      <input 
        type="text" 
        name="description" 
        value={description} 
        onChange={handleChange} 
        placeholder="Description"/>
      <input 
        type="text" 
        name="imgUrl" 
        value={imgUrl} 
        onChange={handleChange} 
        placeholder="Image Url"/>
      <button>Add Listing</button>
    </form>
  )
}