import React from 'react'
import { Container, Row, Col, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            admin_email: '',
            admin_password: '',
            admin_name: ''
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
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

    handleChangeName = e => {
        this.setState({
            admin_name: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();
        const admin = {
            admin_email: this.state.admin_email,
            admin_password: this.state.admin_password,
            admin_name: this.state.admin_name
        };

        console.log(process.env)

        axios({
            method: "POST",
            url: `${process.env.REACT_APP_BASE_URL}/admins/signup`,
            data: admin,

        })
            .then(res => {
                alert('Created Account Success !');
                window.location.replace('/')
            })
            .catch(err => {
                alert("Error")
            })
        console.log(admin)
    }

    render() {
        return (
            <>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs="12" sm="12" md={{ size: 4 }}>
                            <h3 className="mt-4 text-center">Form Registration</h3>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <Row>
                                    <Col>
                                        <label>Name</label>
                                        <Input
                                            onChange={this.handleChangeName}
                                            name="name"
                                            type="text"
                                            value={this.state.admin_name}
                                            className="mb-3"
                                            placeholder="ex : Reyhan Jovie"
                                            required />
                                    </Col>
                                </Row>
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
                                        <Button type="submit" className="btn btn-success btn-block mb-3">Login</Button>
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <center>
                                <Link className="text-center mt-4" to="/">Already have an account? ?</Link>
                            </center>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Signup;