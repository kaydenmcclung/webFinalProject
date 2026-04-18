import React from "react"
import '../App.css'
import TransactionCard from '../components/TransactionCard'
import Welcome from "../components/Welcome"

const Dashboard = () => {
    return (
        <div style={{display:'flex'}}>
            <div>
                <h2>Recent Transactions</h2>
                <TransactionCard transactionName='example name' amount='example amount' category='example category' date='date'/>
                <TransactionCard />
                <TransactionCard />
            </div>
            <div style={{flex:'1'}}>
                <Welcome />
                <h2 style={{paddingTop:'30px'}}>Top Reports</h2>
            </div>
        </div>
    )
}

export default Dashboard