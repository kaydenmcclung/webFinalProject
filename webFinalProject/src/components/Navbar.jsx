import React from "react"
import '../App.css'
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';

const Navbar = () => {

    return (
        <nav className = 'navbar'>
            <div style={{display: 'flex', justifyContent: 'left'}}>
                <Link to='/' style={{ textDecoration: 'none' }}><h1>Budget Tracker</h1></Link>
            </div>
        </nav>
    )
}

export default Navbar