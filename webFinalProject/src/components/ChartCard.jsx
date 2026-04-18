import React from "react"
import '../App.css'

const ChartCard = ({type = "smallChart", title = "Undefined Title"}) => {
    return (
        <div className = {type}>
            <h2>{title}</h2>
        </div>
    )
}

export default ChartCard