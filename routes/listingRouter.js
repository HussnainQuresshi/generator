const express = require("express")
const listingRouter = express.Router()
const Listing = require('../models/listing.js')

// Get All Listings
listingRouter.get("/", (req, res, next) => {
  Listing.find((err, listings) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(listings)
  })
})

// Get listings by user id
listingRouter.get("/user", (req, res, next) => {
  Listing.find({ user: req.user._id }, (err, listings) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(listings)
  })
})

// Add new Listings
listingRouter.post("/", (req, res, next) => {
  req.body.user = req.user._id
  const newListing = new Listing(req.body)
  newListing.save((err, savedListing) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedListing)
  })
})

// Delete Listing
listingRouter.delete("/:listingId", (req, res, next) => {
  Listing.findOneAndDelete(
    { _id: req.params.listingId, user: req.user._id },
    (err, deletedListing) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully delete listing: ${deletedListing.title}`)
    }
  )
})

// Update Listing
listingRouter.put("/:listingId", (req, res, next) => {
  Listing.findOneAndUpdate(
    { _id: req.params.listingId, user: req.user._id },
    req.body,
    { new: true },
    (err, updatedListing) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedListing)
    }
  )
})

module.exports = listingRouter