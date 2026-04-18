import React from "react"
import '../App.css'
import TransactionCard from '../components/TransactionCard'

const Dashboard = () => {
    return (
        <div style={{display:'flex'}}>
            <div>
                <h2>Recent Transactions</h2>
                <TransactionCard />
                <TransactionCard />
                <TransactionCard />
            </div>
            <div>

            </div>
        </div>
    )
}

export default Dashboard