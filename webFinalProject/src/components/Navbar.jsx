import React from "react"
import '../App.css'
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className = 'navbar'>
            <div style={{display: 'flex', justifyContent: 'left'}}>
                <Link to='/'>
                    Home
                </Link>
            </div>
        </nav>
    )
}

export default Navbar