import React, { useState } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function UserProvider(props){
  const initState = { 
    user: JSON.parse(localStorage.getItem("user")) || {}, 
    token: localStorage.getItem("token") || "", 
    listings: [],
    errMsg: ""
  }

  const [userState, setUserState] = useState(initState)

  function signup(credentials){
    axios.post("/auth/signup", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function login(credentials){
    axios.post("/auth/login", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        getUserListings()
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg)
      )
  //    return getUserListings()
  }

  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      listings: []
    })
  }

  function handleAuthErr(errMsg){
    setUserState(prevState => ({
      ...prevState,
      errMsg
    }))
  }

  function resetAuthErr(){
    setUserState(prevState => ({
      ...prevState,
      errMsg: ""
    }))
  }

  function getUserListings(){
    userAxios.get("/api/listing/user")
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          listings: res.data
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function addListing(newListing){
    userAxios.post("/api/listing", newListing)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          listings: [...prevState.listings, res.data]
        }))
      })
      .catch(err => console.log(err.response.data.errMsg)
      )
      return getUserListings()
  }

  // delete listing
  function deleteListing(listingId) {
    userAxios.delete(`/api/listing/${listingId}`)
      .then(res => setUserState(prevState => ({
        ...prevState,
        listings: prevState.listings.filter(listing => listing._id !== listingId)
      })))
      .catch(err => console.log(err)
      )
      return getUserListings()
  }

  // edit listing 
  function editListing(newEntry, listingId){
    userAxios.put(`/api/listing/${listingId}`, newEntry)
    .then(res => setUserState(prevState => ({
      ...prevState,
      listings: prevState.listings.map(listing => listing._id !== listingId? listing: res.data)
    }))
    )
    return getUserListings()
  }

  
    

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addListing,
        deleteListing,
        editListing,
        resetAuthErr
      }}>
      { props.children }
    </UserContext.Provider>
  )
}