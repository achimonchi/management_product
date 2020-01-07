import React from 'react'

import base64 from 'base-64'
import { Row, Col, Input, Button } from 'reactstrap'
import Axios from 'axios'

class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "In",
            productName: "",
            product: {},
            history: {},
            amount: 0,
            id: this.props.match.params.id
        }
        this.handleChangeAmount = this.handleChangeAmount.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleChangeAmount = e => {
        this.setState({
            amount: e.target.value
        })
    }

    componentDidMount = async () => {
        await this.get_history(this.state.id);
    }

    get_history = async (id) => {
        var token = base64.decode(localStorage.getItem("admin_login"));
        token = JSON.parse(token)
        token = token.token
        const history = await Axios({
            method: "GET",
            url: `${process.env.REACT_APP_BASE_URL}/histories/${id}`,
            headers: {
                "Authorization": token
            }
        })

        await this.setState({
            history: history.data.history,
            productName: history.data.history.product_id.product_name,
            amount: history.data.history.history_amount
        })
        console.log(this.state.history.product_id.product_name)
    }

    onSubmit = async (e) => {
        try {
            e.preventDefault();
            var token = base64.decode(localStorage.getItem("admin_login"));
            token = JSON.parse(token)
            token = token.token

            const history = {
                history_amount: this.state.amount,
                product_id: this.state.history.product_id._id,
            }

            console.log(history)

            const res = await Axios({
                method: "PATCH",
                url: `${process.env.REACT_APP_BASE_URL}/histories/${this.state.id}`,
                data: history,
                headers: {
                    "Authorization": token
                }
            })

            if (res.status === 200) {
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
                <h3>Edit Tracking Product {this.state.history.history_status}</h3>
                <hr />
                <Row>
                    <Col md={{ size: 6 }}>
                        <form onSubmit={this.onSubmit}>
                            <Row>
                                <Col md={{ size: 12 }} sm={{ size: 12 }} className="mb-3">
                                    <label>Nama Product</label>
                                    <Input value={this.state.productName} disabled />
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

export default Edit;