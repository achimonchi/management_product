import React from 'react'

import base64 from 'base-64'
import { Row, Col, Input, Button } from 'reactstrap'
import Axios from 'axios'

class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            id: this.props.match.params.id
        }


        this.handleChangeName = this.handleChangeName.bind(this)
    }

    componentDidMount = async () => {

        var token = base64.decode(localStorage.getItem("admin_login"));
        token = JSON.parse(token)
        token = token.token
        const categories = await Axios({
            method: "GET",
            url: `${process.env.REACT_APP_BASE_URL}/categories/${this.state.id}`,
            headers: {
                "Authorization": token
            }
        })

        await this.setState({
            name: categories.data.category.category_name,
        })

        console.log(categories.data.category)
    }

    handleChangeName = e => {
        this.setState({
            name: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const category = {
            category_name: this.state.name,
        }

        this.updateData(category)

    }

    updateData = async (category) => {
        try {

            var token = base64.decode(localStorage.getItem("admin_login"));
            token = JSON.parse(token)
            token = token.token


            const res = await Axios({
                method: "PATCH",
                url: `${process.env.REACT_APP_BASE_URL}/categories/${this.state.id}`,
                data: category,
                headers: {
                    "Authorization": token
                }
            })

            if (res.status === 200) {
                alert("Update Category Successfull")
            }

        }
        catch (err) {
            alert('Update Category Failure !')
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
                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3 mt-3">
                                    <Button className="btn btn-block btn-info" type="submit">Update Category</Button>
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