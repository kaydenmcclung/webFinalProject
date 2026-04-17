import React from "react"
import '../App.css'
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className = 'navbar'>
            <div style={{display: 'flex', justifyContent: 'left'}}>
                <Link to='/' style={{ textDecoration: 'none' }}><h2>Application Name</h2></Link>
                <h2 style={{flex:'1'}}>current page</h2>
            </div>
        </nav>
    )
}

export default Navbar