import React from "react"
import '../App.css'

const TransactionLong = ({
    transactionName = "Name of Transaction",
    amount = "Dollar Amount",
    category = "Category",
    date = "Date"
    }) => {
    return (
        <div className ='transactionLong'>
            <div style={{paddingRight:'20vh'}}>
                <h2 style={{paddingBottom:'12px'}}>{transactionName}</h2>
                <p>${amount}</p>
            </div>
            <div style={{justify:'center'}}>
                <p style={{paddingBottom:'22px'}}>{category}</p>
                <p>{date}</p>
            </div>
        </div>
    )
}

export default TransactionLong