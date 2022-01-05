import React, { useContext } from 'react'
import ListingForm from './ListingForm.js'
import ListingList from './ListingList.js'
// import Listing from './Listing.js'
import { UserContext } from '../context/UserProvider.js'

export default function Profile(){
  const { 
    user: { 
      username 
    }, 
    addListing, 
    listings 
  } = useContext(UserContext)

  return (
    <div className="profile">
      <h1>Welcome @{username}!</h1>
      <h3>Add A Listing</h3>
      <ListingForm addListing={addListing}/>
      <h3>Your listing</h3>
      <ListingList listings={listings}/>
    </div>
  )
}