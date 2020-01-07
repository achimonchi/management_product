import React from 'react'

import base64 from 'base-64'
import { Row, Col, Input, Button } from 'reactstrap'
import Axios from 'axios'

class Add extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            stock: "",
            price: "",
            category: "",
            categories: []
        }

        this.handleChangeStock = this.handleChangeStock.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangePrice = this.handleChangePrice.bind(this)
    }

    handleChangeName = e => {
        this.setState({
            name: e.target.value
        })
    }

    handleChangeStock = e => {
        this.setState({
            stock: e.target.value
        })
    }

    handleChangePrice = e => {
        this.setState({
            price: e.target.value
        })
    }

    handleChangeCategory = e => {
        this.setState({
            category: e.target.value
        })
    }

    componentDidMount = async () => {
        await this.get_category();

    }

    get_category = async () => {
        var token = base64.decode(localStorage.getItem("admin_login"));
        token = JSON.parse(token)
        token = token.token
        const categories = await Axios({
            method: "GET",
            url: `${process.env.REACT_APP_BASE_URL}/categories`,
            headers: {
                "Authorization": token
            }
        })

        await this.setState({
            categories: categories.data.categories
        })
    }

    onSubmit = async (e) => {
        try {

            e.preventDefault();
            var token = base64.decode(localStorage.getItem("admin_login"));
            token = JSON.parse(token)
            token = token.token

            const product = {
                product_name: this.state.name,
                product_stock: this.state.stock,
                product_price: this.state.price,
                product_category: this.state.category
            }

            if (this.state.category !== "") {
                const res = await Axios({
                    method: "POST",
                    url: `${process.env.REACT_APP_BASE_URL}/products/`,
                    data: product,
                    headers: {
                        "Authorization": token
                    }
                })

                if (res.status === 201) {
                    alert("Created Product Successfull")
                    this.setState({
                        name: "",
                        stock: "",
                        price: ""
                    })
                }
            }
            else {
                alert("Category is required !")
            }


            // console.log(res)

        }
        catch (err) {
            alert('Add Product Failure !')
        }

    }


    render() {
        return (
            <>
                <h3>Add Product</h3>
                <hr />
                <Row>
                    <Col md={{ size: 6 }}>
                        <form onSubmit={this.onSubmit}>
                            <Row>
                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3">
                                    <label> Name</label>
                                    <Input onChange={this.handleChangeName} id="name" value={this.state.name} placeholder="ex: Baju" required />
                                </Col>
                                <Col md={{ size: 6 }} sm={{ size: 12 }} className="mb-3">
                                    <label>Stock</label>
                                    <Input onChange={this.handleChangeStock} id="name" type="number" value={this.state.stock} placeholder="ex: 4" required />
                                </Col>
                                <Col md={{ size: 6 }} sm={{ size: 12 }} className="mb-3">
                                    <label>Price</label>
                                    <Input onChange={this.handleChangePrice} id="name" type="number" value={this.state.price} placeholder="ex: 50000" required />
                                </Col>
                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3">
                                    <label>Category</label>
                                    <select onChange={this.handleChangeCategory} className="form-control">
                                        <option value="">------- Choose Categories ---------</option>
                                        {this.state.categories.map((c, i) =>
                                            <option key={i} value={c._id}>{c.category_name}</option>
                                        )}
                                    </select>

                                </Col>
                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3 mt-3">
                                    <Button className="btn btn-block btn-info" type="submit">Save Product</Button>
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