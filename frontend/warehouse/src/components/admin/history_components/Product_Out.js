import React from 'react'

import base64 from 'base-64'
import { Row, Col, Input, Button } from 'reactstrap'
import Axios from 'axios'

class ProductOut extends React.Component {
    constructor() {
        super()
        this.state = {
            status: "Out",
            products: [],
            product: "",
            amount: 0,
        }
        this.handleChangeProduct = this.handleChangeProduct.bind(this)
        this.handleChangeAmount = this.handleChangeAmount.bind(this)
    }

    handleChangeProduct = e => {
        this.setState({
            product: e.target.value
        })
    }

    handleChangeAmount = e => {
        this.setState({
            amount: e.target.value
        })
    }

    componentDidMount = async () => {
        await this.get_product();
    }

    get_product = async () => {
        var token = base64.decode(localStorage.getItem("admin_login"));
        token = JSON.parse(token)
        token = token.token
        const products = await Axios({
            method: "GET",
            url: `${process.env.REACT_APP_BASE_URL}/products`,
            headers: {
                "Authorization": token
            }
        })

        await this.setState({
            products: products.data.products
        })
    }

    onSubmit = async (e) => {
        try {
            e.preventDefault();
            var token = base64.decode(localStorage.getItem("admin_login"));
            token = JSON.parse(token)
            token = token.token

            const history = {
                history_status: this.state.status,
                history_amount: this.state.amount,
                product_id: this.state.product
            }

            console.log(history)

            const res = await Axios({
                method: "POST",
                url: `${process.env.REACT_APP_BASE_URL}/histories/`,
                data: history,
                headers: {
                    "Authorization": token
                }
            })

            if (res.status === 201) {
                alert("Tracking Product History Successfull")
                this.setState({
                    name: ""
                })
            }

            console.log(res)
        }
        catch (err) {
            alert('Tracking Product History Failure !')
        }

    }


    render() {
        return (
            <>
                <h3>Tracking Product In</h3>
                <hr />
                <Row>
                    <Col md={{ size: 6 }}>
                        <form onSubmit={this.onSubmit}>
                            <Row>
                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3">
                                    <label> Product</label>
                                    <select onChange={this.handleChangeProduct} className="form-control">
                                        <option value="">----- Choose Product -----</option>
                                        {this.state.products.map((p, i) =>
                                            <option value={p._id}>{p.product_name}</option>
                                        )}
                                    </select>
                                </Col>
                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3">
                                    <label>Amount</label>
                                    <Input onChange={this.handleChangeAmount} id="amount" value={this.state.amount} type="number" placeholder="ex: Technology" required />
                                </Col>

                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3 mt-3">
                                    <Button className="btn btn-block btn-info" type="submit">Track Product In</Button>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </>
        )
    }
}

export default ProductOut;