import React from "react"
import '../App.css'
import TransactionLong from "../components/TransactionLong"

const History = () => {
    return (
        <div>
           <h2>Past Transactions</h2>
           <TransactionLong />
           <TransactionLong />
           <TransactionLong />
           <TransactionLong />
           <TransactionLong />
           <TransactionLong />
           <TransactionLong />
        </div>
    )
}

export default History