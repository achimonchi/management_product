import React from 'react'

import base64 from 'base-64'
import { Row, Col, Input, Button } from 'reactstrap'
import Axios from 'axios'

class Add extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: ""
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
    }

    handleChangeName = e => {
        this.setState({
            name: e.target.value
        })
    }

    handleChangeEmail = e => {
        this.setState({
            email: e.target.value
        })
    }

    handleChangePassword = e => {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit = async (e) => {
        try {
            e.preventDefault();
            var token = base64.decode(localStorage.getItem("admin_login"));
            token = JSON.parse(token)
            token = token.token

            const admin = {
                admin_name: this.state.name,
                admin_email: this.state.email,
                admin_password: this.state.password,
            }
            const res = await Axios({
                method: "POST",
                url: `${process.env.REACT_APP_BASE_URL}/admins/`,
                data: admin,
                headers: {
                    "Authorization": token
                }
            })

            if (res.status == 201) {
                alert("Created admin successfull")
                this.setState({
                    name: "",
                    email: "",
                    password: ""
                })
            }

            console.log(res)

        }
        catch (err) {
            alert('Add Admin Failure !')
        }

    }


    render() {
        return (
            <>
                <h3>Add Admin</h3>
                <hr />
                <Row>
                    <Col md={{ size: 6 }}>
                        <form onSubmit={this.onSubmit}>
                            <Row>
                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3">
                                    <label> Name</label>
                                    <Input onChange={this.handleChangeName} id="name" value={this.state.name} placeholder="ex: Reyhan Jovie" required />
                                </Col>
                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3">
                                    <label>Email</label>
                                    <Input onChange={this.handleChangeEmail} id="name" type="email" value={this.state.email} placeholder="ex: admin@gmail.com" required />
                                </Col>
                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3">
                                    <label>Password</label>
                                    <Input onChange={this.handleChangePassword} id="name" type="password" value={this.state.password} placeholder="ex: ****" required />
                                </Col>

                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3 mt-3">
                                    <Button className="btn btn-block btn-info" type="submit">Save Admin</Button>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </>
        )
    }
}

export default Add;