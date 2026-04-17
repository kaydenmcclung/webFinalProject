import React from "react"
import '../App.css'
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <nav style={{ width: '200px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h2>Navigation</h2>
      <Link to="/">Dashboard</Link>
      <Link to="/addtransaction">Add Transaction</Link>
      <Link to="/history">Transaction History</Link>
      <Link to="/reports">Reports</Link>
      <Link to="/insights">Insights</Link>
    </nav>
  )
};

export default Sidebar