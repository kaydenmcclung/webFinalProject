import React from "react"
import '../App.css'

const TransactionCard = ({
    transactionName = "Name of Transaction",
    amount = "Dollar Amount",
    category = "Category",
    date = "Date"
    }) => {
    return (
        <div className = 'transactionCard'>
            <h2>{transactionName}</h2>
            <p>${amount}</p>
            <p>{category}</p>
            <p>{date}</p>
        </div>
    )
}

export default TransactionCard