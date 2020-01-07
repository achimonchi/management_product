import React from 'react'
import { Link } from 'react-router-dom'

import DrawerToggle from './_drawerToggle'
import './_nav.css'

class _nav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            click: props.drawerToggleClickHandler
        }
    }
    render() {
        return (
            <header>
                <nav className="toolbar_navigation">
                    <div>

                    </div>
                    <div className="toolbar_logo">
                        <Link to="/">Management Products </Link>
                    </div>
                    <div className="spacer" />
                    welocme, <b><i className="mr-5"> Admin</i></b>
                    <div className="toolbar_navigation_items">
                        <DrawerToggle click={this.state.click} />
                    </div>
                </nav>
            </header>
        )
    }
}

export default _nav