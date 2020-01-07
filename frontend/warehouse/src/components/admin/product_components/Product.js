import React from 'react'
import { Container, Row, Col, Button, Table } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FaPlus, FaTrash, FaPen } from 'react-icons/fa'
import Axios from 'axios'
import base64 from 'base-64'
import moment from 'moment'

class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    componentDidMount = async () => {
        await setInterval(async () => {
            await this.get_product();
        }, 1000)
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

        console.log(this.state.products)
    }

    delete_product = async (id) => {
        try {
            var token = base64.decode(localStorage.getItem("admin_login"));
            token = JSON.parse(token)
            token = token.token
            await Axios({
                method: "DELETE",
                url: `${process.env.REACT_APP_BASE_URL}/products/${id}`,
                headers: {
                    "Authorization": token
                }
            })

            alert("Delete Product Successfull")
        }
        catch (err) {
            alert('Delete Product Failure')
        }
    }

    render() {
        var no = 1
        return (
            <>
                <Row className="mb-3">
                    <Col>
                        <h3>Halaman Product</h3>
                        <hr />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Link to="/products/add">
                            <Button className="btn btn-sm btn-info" ><FaPlus /> New Product </Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.products.length === 0
                            ? <p className="text-center">No Data ...</p>
                            : <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Category</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.products.map((p, i) =>
                                        <tr key={i}>
                                            <td>{no++}</td>
                                            <td>{p.product_name}</td>
                                            <td>{p.product_price}</td>
                                            <td>{p.product_stock > 20
                                                ? <label className="badge badge-info">{p.product_stock}</label>
                                                : <label className="badge badge-danger">{p.product_stock}</label>}</td>
                                            <td>{p.product_category.category_name}</td>
                                            <td>{moment(p.created_at).format("DD/MMMM/YYYY, h:mm:ss a")}</td>
                                            <td>
                                                <Link to={"/products/edit/" + p._id}>
                                                    <Button className="btn btn-sm btn-success mb-2">
                                                        <FaPen />
                                                    </Button>
                                                </Link>

                                                <Button onClick={() => this.delete_product(p._id)} className="btn btn-sm btn-danger ml-2 mb-2">
                                                    <FaTrash />
                                                </Button>

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

export default Product