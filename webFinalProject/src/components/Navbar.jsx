import React from "react"
import '../App.css'
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    //to set title in navbar to the current page name
    const location = useLocation();
    const titles = {
        '/': 'Dashboard',
        '/addtransaction': 'Add Transaction',
        '/history': 'Account Settings',
        '/reports' : 'Reports',
        '/insights' : 'Insights'
    };
    const currentTitle = titles[location.pathname] || 'Page Title';

    return (
        <nav className = 'navbar'>
            <div style={{display: 'flex', justifyContent: 'left'}}>
                <Link to='/' style={{ textDecoration: 'none' }}><h2>Application Name</h2></Link>
                <h2 style={{flex:'1'}}>{currentTitle}</h2>
            </div>
        </nav>
    )
}

export default Navbar