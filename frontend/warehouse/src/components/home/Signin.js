import React from 'react'
import { Container, Row, Col, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import base64 from 'base-64';


class Signin extends React.Component {
    constructor() {
        super();
        this.state = {
            admin_email: '',
            admin_password: ''
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChangeEmail = e => {
        this.setState({
            admin_email: e.target.value
        })
    }

    handleChangePassword = e => {
        this.setState({
            admin_password: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();
        const admin = {
            admin_email: this.state.admin_email,
            admin_password: this.state.admin_password,
        }

        axios({
            method: "POST",
            url: "http://localhost:4000/admins/login",
            data: admin,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => {
                if (res.data) {
                    let data = JSON.stringify(res.data);
                    data = base64.encode(data)
                    console.log(data)
                    localStorage.setItem('admin_login', data);
                    window.location.replace('/')

                }
            })

    }

    render() {
        return (
            <>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs="12" sm="12" md={{ size: 4 }}>
                            <h3 className="mt-4 text-center">Form Login</h3>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <Row>
                                    <Col>
                                        <label>Email</label>
                                        <Input
                                            onChange={this.handleChangeEmail}
                                            name="email"
                                            type="email"
                                            value={this.state.admin_email}
                                            className="mb-3"
                                            placeholder="ex : admin@gmail.com"
                                            required />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>Password</label>
                                        <Input
                                            onChange={this.handleChangePassword}
                                            name="password"
                                            type="password"
                                            value={this.state.admin_password}
                                            className="mb-3"
                                            placeholder="ex : *******"
                                            required />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button type="submit" className="btn btn-info btn-block mb-3">Login</Button>
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <center>
                                <Link className="text-center mt-4" to="/signup">Didnt have any account ?</Link>
                            </center>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Signin;