import React from 'react'

import base64 from 'base-64'
import { Row, Col, Input, Button } from 'reactstrap'
import Axios from 'axios'

class Add extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
        }
        this.handleChangeName = this.handleChangeName.bind(this)
    }

    handleChangeName = e => {
        this.setState({
            name: e.target.value
        })
    }

    onSubmit = async (e) => {
        try {
            e.preventDefault();
            var token = base64.decode(localStorage.getItem("admin_login"));
            token = JSON.parse(token)
            token = token.token

            const category = {
                category_name: this.state.name,
            }
            const res = await Axios({
                method: "POST",
                url: `${process.env.REACT_APP_BASE_URL}/categories/`,
                data: category,
                headers: {
                    "Authorization": token
                }
            })

            if (res.status == 201) {
                alert("Created Category successfull")
                this.setState({
                    name: ""
                })
            }

            console.log(res)

        }
        catch (err) {
            alert('Created Admin Failure !')
        }

    }


    render() {
        return (
            <>
                <h3>Add Category</h3>
                <hr />
                <Row>
                    <Col md={{ size: 6 }}>
                        <form onSubmit={this.onSubmit}>
                            <Row>
                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3">
                                    <label> Name</label>
                                    <Input onChange={this.handleChangeName} id="name" value={this.state.name} placeholder="ex: Technology" required />
                                </Col>

                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3 mt-3">
                                    <Button className="btn btn-block btn-info" type="submit">Save Category</Button>
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