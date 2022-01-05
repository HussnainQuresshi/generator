import React, {useState, useContext} from "react"
import { UserContext } from "../context/UserProvider"

function ListingEditForm(props){
    const initInputs ={

        sku: props.sku || "",
        title: props.title || "",
        upc: props.upc || "",
        description: props.description || "",
        imgUrl: props.imgUrl || ""
    }
    const [inputs, setInputs] = useState(initInputs)
    const {editListing} = useContext(UserContext)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        editListing(inputs, props._id)
        props.toggleCanEdit(prevState => !prevState)
    }

    const { sku, title, upc, description, imgUrl} = inputs

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
      <button>Submit Changes</button>
    </form>
    )
}

export default ListingEditForm