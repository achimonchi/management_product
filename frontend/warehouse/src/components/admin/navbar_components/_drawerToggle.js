import React from 'react'

import './_drawerToggle.css'

const _drawerToggle = props => (
    <button className="toggle_button" onClick={props.click}>
        <div className="toggle_button_line atas"></div>
        <div className="toggle_button_line tengah"></div>
        <div className="toggle_button_line bawah"></div>
    </button>
)

export default _drawerToggle