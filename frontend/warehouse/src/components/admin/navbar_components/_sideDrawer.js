import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import './_sideDrawer.css'

function logout() {
    localStorage.removeItem('admin_login')
    alert('Logout Berhasil !')
    window.location.reload(true)
}

const SideDrawer = props => {
    let drawerClass = 'side_drawer'


    if (props.show) {
        drawerClass = 'side_drawer open'
        console.log('open')
    }

    return (
        <nav className={drawerClass}>

            <div>
                <span className="icon"><FaUser className="icon-user" /></span>
                <p>
                    Welcome, {props.user.nama}
                </p>
                <Link to="/profile">Data Diri</Link>
                <button className="btn-logout" onClick={logout}>Logout</button>
            </div>


        </nav>
    )
}

export default SideDrawer