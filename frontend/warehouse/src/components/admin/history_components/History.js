import React from 'react'
import { Row, Col, Button, Table } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FaPen, FaArrowDown, FaArrowUp } from 'react-icons/fa'
import Axios from 'axios'
import base64 from 'base-64'
import moment from 'moment'

class History extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            histories: []
        }
    }

    componentDidMount = async () => {
        await setInterval(async () => {
            await this.get_history();
        }, 1000)
    }

    get_history = async () => {
        var token = base64.decode(localStorage.getItem("admin_login"));
        token = JSON.parse(token)
        token = token.token
        const histories = await Axios({
            method: "GET",
            url: `${process.env.REACT_APP_BASE_URL}/histories`,
            headers: {
                "Authorization": token
            }
        })

        await this.setState({
            histories: histories.data.histories
        })

        console.log(this.state.histories)
    }

    render() {
        var no = 1;
        return (
            <>
                <Row className="mb-3">
                    <Col>
                        <h3>History</h3>
                        <hr />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Link to="/histories/product_in">
                            <Button className="ml-3 mb-3 btn btn-sm btn-info" ><FaArrowDown /> Product In </Button>
                        </Link>
                        <Link to="/histories/product_out">
                            <Button className="ml-3 mb-3 btn btn-sm btn-warning" ><FaArrowUp /> Product Out </Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.histories.length === 0
                            ? <p className="text-center">No Data ...</p>
                            : <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Status</th>
                                        <th>Amount</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.histories.map((h, i) =>
                                        <tr key={i}>
                                            <td>{no++}</td>
                                            <td>{h.product_id.product_name}</td>
                                            <td>
                                                {h.history_status === "In"
                                                    ? <label className="badge badge-info">{h.history_status}</label>
                                                    : <label className="badge badge-danger">{h.history_status}</label>}
                                            </td>
                                            <td>{h.history_amount}</td>
                                            <td>{moment(h.created_at).format("DD/MM/YYYY, h:mm:ss a")}</td>
                                            <td>
                                                <Link to={"/histories/edit/" + h._id}>
                                                    <Button className="btn btn-sm btn-success mb-2">
                                                        <FaPen />
                                                    </Button>
                                                </Link>

                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>

                        }
                    </Col>
                </Row>
            </>
        )
    }
}

export default History