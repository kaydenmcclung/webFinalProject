import React from "react"
import '../App.css'
import { Link } from "react-router-dom"

const Welcome = () => {
    return (
        <div className = 'welcome'>
            <h2>Welcome!</h2>
            <p>To get started, add a transaction.</p>
            <div>
                <p><Link to="/addtransaction" className="sidebar-box">Add Transaction</Link></p>
            </div>
        </div>
    )
}

export default Welcome