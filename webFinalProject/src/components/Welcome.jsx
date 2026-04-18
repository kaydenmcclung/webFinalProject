import React from "react"
import '../App.css'

const Welcome = ({userID = 'Undefined User'}) => {
    return (
        <div className = 'welcome'>
            <h2>Welcome, {userID}!</h2>
        </div>
    )
}

export default Welcome