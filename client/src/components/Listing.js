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
      <table>
      <tbody>
      <td>{sku}</td>
      <td>{title}</td>
      <td>{upc}</td>
      <td>{ description }</td>
      <td><img src={imgUrl} alt="listing" width={50}/></td>
      <td>
      <button onClick={()=>deleteListing(_id)}>Delete Listing</button>
      </td>
      <td>
      <button onClick={() => toggleCanEdit(prevState => !prevState)}>Edit Listing</button>
      </td>
      </tbody>
      </table>
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