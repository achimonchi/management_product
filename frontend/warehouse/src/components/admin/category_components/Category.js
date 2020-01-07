import React from 'react'
import { Container, Row, Col, Button, Table } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FaPlus, FaTrash, FaPen } from 'react-icons/fa'
import Axios from 'axios'
import base64 from 'base-64'

class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }

    componentDidMount = async () => {
        await setInterval(async () => {
            await this.get_category();
        }, 1000)
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

        console.log(this.state.categories)
    }

    delete_category = async (id) => {
        try {
            var token = base64.decode(localStorage.getItem("admin_login"));
            token = JSON.parse(token)
            token = token.token
            await Axios({
                method: "DELETE",
                url: `${process.env.REACT_APP_BASE_URL}/categories/${id}`,
                headers: {
                    "Authorization": token
                }
            })

            alert("Delete Category Successfull")
        }
        catch (err) {
            alert('Delete Category Failure')
        }
    }

    render() {
        var no = 1;
        return (
            <>
                <Row className="mb-3">
                    <Col>
                        <h3>Category</h3>
                        <hr />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Link to="/categories/add">
                            <Button className="btn btn-sm btn-info" ><FaPlus /> New Category </Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.categories.length === 0
                            ? <p className="text-center">No Data ...</p>
                            : <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Category</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.categories.map((c, i) =>
                                        <tr key={i}>
                                            <td>{no++}</td>
                                            <td>{c.category_name}</td>
                                            <td>{c.created_at}</td>
                                            <td>
                                                <Link to={"/categories/edit/" + c._id}>
                                                    <Button className="btn btn-sm btn-success mb-2">
                                                        <FaPen />
                                                    </Button>
                                                </Link>

                                                <Button onClick={() => this.delete_category(c._id)} className="btn btn-sm btn-danger ml-2 mb-2">
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

export default Category