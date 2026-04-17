import React from "react"
import '../App.css'
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <h2 style={{marginBottom:'20px'}}>Navigation</h2>
      <ul className="sidebar-links">
        <li><Link to="/" className="sidebar-box">Dashboard</Link></li>
        <li><Link to="/addtransaction" className="sidebar-box">Add Transaction</Link></li>
        <li><Link to="/history" className="sidebar-box">Transaction History</Link></li>
        <li><Link to="/reports" className="sidebar-box">Reports</Link></li>
        <li><Link to="/insights" className="sidebar-box">Insights</Link></li>
      </ul>
    </nav>
  )
};

export default Sidebar