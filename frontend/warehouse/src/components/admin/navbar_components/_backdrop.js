import React from 'react'
import './_backdrop.css'

const _backdrop = props => {
    return (
        <div className="backdrop" onClick={props.click}></div>
    )
}

export default _backdrop