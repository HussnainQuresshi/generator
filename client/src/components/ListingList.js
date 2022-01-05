import React from 'react'
import Listing from './Listing.js'

export default function ListingList(props){
  const { listings } = props
  return (
    <div className="listing-list">
      { listings.map(listing => <Listing {...listing} key={listing._id}/>) }
    </div>
  )
}