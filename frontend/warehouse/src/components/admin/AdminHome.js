import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import base64 from 'base-64'
import { Container, Row, Col } from 'reactstrap'

import Nav from './navbar_components/_nav'
import SideDrawer from './navbar_components/_sideDrawer'
import Backdrop from './navbar_components/_backdrop'

import Dashboard from './Dashboard'

import Admin from './admin_components/Admin'
import AdminAdd from './admin_components/Add'
import AdminEdit from "./admin_components/Edit"

import Category from './category_components/Category'
import CategoryAdd from './category_components/Add'
import CategoryEdit from './category_components/Edit'

import History from './history_components/History'
import HistoryIn from './history_components/Product_In'
import HistoryOut from './history_components/Product_Out'
import HistoryEdit from './history_components/Edit'


import Product from './product_components/Product'
import ProductAdd from './product_components/Add'



import CardDashboard from './CardDashboard'

import './Admin.css'

import { FaUser, FaBox, FaList, FaStickyNote } from 'react-icons/fa'

class AdminHome extends React.Component {
    constructor() {
        super()
        var dates = new Date()
        var month = dates.getMonth()

        switch (month + 1) {
            case 1:
                month = "January"
                break
            case 2:
                month = "February"
                break
            case 3:
                month = "March"
                break
            case 4:
                month = "April"
                break
            case 5:
                month = "May"
                break
            case 6:
                month = "June"
                break
            case 7:
                month = "July"
                break
            case 8:
                month = "August"
                break
            case 9:
                month = "September"
                break
            case 10:
                month = "October"
                break
            case 11:
                month = "November"
                break
            case 12:
                month = "December"
                break
            default:
                month = "January"
        }
        this.state = {
            user: JSON.parse(base64.decode(localStorage.getItem('admin_login'))),
            sideDrawerOpen: false,
            date: dates.getDate(),
            month: month,
            year: dates.getFullYear()
        }

    }

    cekUser = () => {

    }

    componentDidMount = () => {
        setInterval(() => {
            this.setState({
                user: JSON.parse(base64.decode(localStorage.getItem('admin_login'))),
            })
            // console.log(this.state.user)
        }, 10)
    }

    drawerToggleClickHandler = () => {
        this.setState({
            sideDrawerOpen: !this.state.sideDrawerOpen
        })
    }

    backdropClickHandler = () => {
        this.setState({
            sideDrawerOpen: false
        })
    }

    render() {
        let backdrop

        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler} />
        }
        return (
            <Router>
                <div>
                    <Nav user={this.state.user} drawerToggleClickHandler={this.drawerToggleClickHandler} />
                    <SideDrawer user={this.state.user} show={this.state.sideDrawerOpen} />
                    {backdrop}

                    <div className="content">
                        <Container>
                            <Row>
                                <Col >
                                    <div className="date">{this.state.date} - {this.state.month} - {this.state.year}</div>
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <Col>
                                    <Row>
                                        <Col className="mt-4" md={{ size: 3 }}>
                                            <CardDashboard link="/admins" icon={<FaUser />} name="Admin" />

                                        </Col>
                                        <Col className="mt-4" md={{ size: 3 }}>
                                            <CardDashboard icon={<FaList />} link="/categories" name="Category" />
                                        </Col>
                                        <Col className="mt-4" md={{ size: 3 }}>
                                            <CardDashboard icon={<FaStickyNote />} link="/histories" name="History" />
                                        </Col>
                                        <Col className="mt-4" md={{ size: 3 }}>
                                            <CardDashboard icon={<FaBox />} link="/products" name="Product" />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="box mt-5">
                                        <Switch>
                                            <Route exact path="/" component={Dashboard} />
                                            <Route exact path="/admins" component={Admin} />
                                            <Route exact path="/admins/add" component={AdminAdd} />
                                            <Route exact path="/admins/edit/:id" component={AdminEdit} />
                                            <Route exact path="/categories" component={Category} />
                                            <Route exact path="/categories/add" component={CategoryAdd} />
                                            <Route exact path="/categories/edit/:id" component={CategoryEdit} />
                                            <Route exact path="/histories" component={History} />
                                            <Route exact path="/histories/edit/:id" component={HistoryEdit} />
                                            <Route exact path="/histories/product_in" component={HistoryIn} />
                                            <Route exact path="/histories/product_out" component={HistoryOut} />
                                            <Route exact path="/products" component={Product} />
                                            <Route exact path="/products/add" component={ProductAdd} />
                                        </Switch>
                                    </div>
                                </Col>
                            </Row>
                        </Container>

                    </div>
                </div>
            </Router>

        )
    }
}

export default AdminHome