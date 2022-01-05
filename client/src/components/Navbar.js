import React from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css"

export default function Navbar(props){
  const { logout } = props
  return (
    // <div className="navbar">
    <nav>
      <ul>
      <li><a href="/#"><img src="https://logodix.com/logo/285000.png"
                  alt="eBay Logo"
                  style={{ maxWidth: 55}}
                  />
                  </a></li>
      <li><a href="/#"> <Link to="/profile">Profile</Link></a></li>
      {/* <li><a><Link to="/public">Public</Link></a></li> */}
      <li><a href="/#"><button onClick={logout}>Logout</button></a></li>
      </ul>
    </nav>
  )
}