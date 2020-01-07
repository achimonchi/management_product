import React from 'react'

import base64 from 'base-64'
import { Row, Col, Input, Button } from 'reactstrap'
import Axios from 'axios'

class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            newPassword: "",
            confPassword: "",
            id: this.props.match.params.id
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this)
        this.handleChangeConfNewPassword = this.handleChangeConfNewPassword.bind(this)
        this.handleSubmitPassword = this.handleSubmitPassword.bind(this)
    }

    componentDidMount = async () => {

        var token = base64.decode(localStorage.getItem("admin_login"));
        token = JSON.parse(token)
        token = token.token
        const admin = await Axios({
            method: "GET",
            url: `${process.env.REACT_APP_BASE_URL}/admins/${this.state.id}`,
            headers: {
                "Authorization": token
            }
        })

        await this.setState({
            name: admin.data.admin.admin_name,
            email: admin.data.admin.admin_email
        })

        console.log(admin.data.admin)
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

    handleChangeNewPassword = e => {
        this.setState({
            newPassword: e.target.value
        })
    }

    handleChangeConfNewPassword = e => {
        this.setState({
            confPassword: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const admin = {
            admin_name: this.state.name,
            admin_email: this.state.email,
        }

        this.updateData(admin)

    }

    updateData = async (admin) => {
        try {

            var token = base64.decode(localStorage.getItem("admin_login"));
            token = JSON.parse(token)
            token = token.token


            const res = await Axios({
                method: "PATCH",
                url: `${process.env.REACT_APP_BASE_URL}/admins/${this.state.id}`,
                data: admin,
                headers: {
                    "Authorization": token
                }
            })

            if (res.status === 200) {
                alert("Update admin successfull")
            }

        }
        catch (err) {
            alert('Update Admin Failure !')
        }
    }

    handleSubmitPassword = async (e) => {
        e.preventDefault();
        if (this.state.newPassword === this.state.confPassword) {
            const adminPass = {
                admin_password: this.state.newPassword
            }

            console.log(adminPass)

            this.updateData(adminPass)

        }
        else {
            alert("Password tidak sama")
        }

    }


    render() {
        return (
            <>
                <h3>Edit Data {this.state.name}</h3>
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

                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3 mt-3">
                                    <Button className="btn btn-block btn-info" type="submit">Save Admin</Button>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                    <Col md={{ size: 4, offset: 1 }}>
                        <form onSubmit={this.handleSubmitPassword}>
                            <Row>
                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3">
                                    <label> New Password</label>
                                    <Input onChange={this.handleChangeNewPassword} id="newPass" type="password" value={this.state.newPassword} required />
                                </Col>
                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3">
                                    <label>Confirm Password</label>
                                    <Input onChange={this.handleChangeConfNewPassword} id="confPass" type="password" value={this.state.confPassword} required />
                                </Col>

                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3 mt-3">
                                    <Button outline color="secondary" className="btn btn-block" type="submit" id="edit-password">Edit Password </Button>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </>
        )
    }
}

export default Edit;