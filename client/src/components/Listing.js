import React, { useState, useContext } from 'react'
import {UserContext} from "../context/UserProvider"
import ListingEditForm from './ListingEditForm.js'

export default function Listing(props){

  const [canEdit, toggleCanEdit] = useState(false)

  const { addListing, deleteListing } = useContext(UserContext)
  const { sku, title, upc, description, imgUrl, _id } = props

  return (
    <div className="listing">
      {
        !canEdit?
      <>
      <h3>{sku}</h3>
      <h1>{title}</h1>
      <h3>{upc}</h3>
      <h3>{ description }</h3>
      <img src={imgUrl} alt="listing" width={75}/>
      <button onClick={()=>deleteListing(_id)}>Delete Listing</button>
      <button onClick={() => toggleCanEdit(prevState => !prevState)}>Edit Listing</button>
      </>
      :
      <>
      <ListingEditForm {...props} addListing={addListing} toggleCanEdit={toggleCanEdit}/>
      <button onClick={() => deleteListing(_id)}>Delete Listing</button>
      <button onClick={() => toggleCanEdit(prevState => !prevState)}>Cancel</button>
      </>
      }
    </div>
  )
}