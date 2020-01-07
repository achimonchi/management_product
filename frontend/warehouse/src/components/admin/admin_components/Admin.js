import React from 'react'
import { Row, Col, Table, Button } from 'reactstrap'
import Axios from 'axios'
import base64 from 'base-64'
import { Link } from 'react-router-dom'
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa'

class Admin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            admins: []
        }
    }

    componentDidMount = async () => {
        await setInterval(async () => {
            await this.get_admin();
        }, 1000)
    }

    get_admin = async () => {
        var token = base64.decode(localStorage.getItem("admin_login"));
        token = JSON.parse(token)
        token = token.token
        const admins = await Axios({
            method: "GET",
            url: `${process.env.REACT_APP_BASE_URL}/admins`,
            headers: {
                "Authorization": token
            }
        })

        await this.setState({
            admins: admins.data.admin
        })
    }

    delete_admin = async (id) => {
        try {
            var token = base64.decode(localStorage.getItem("admin_login"));
            token = JSON.parse(token)
            token = token.token
            await Axios({
                method: "DELETE",
                url: `${process.env.REACT_APP_BASE_URL}/admins/${id}`,
                headers: {
                    "Authorization": token
                }
            })

            alert("Delete Admin Successfull")
        }
        catch (err) {
            alert('Delete Admin Failure')
        }
    }


    render() {
        var no = 1;
        return (
            <>
                <Row className="mb-3">
                    <Col>
                        <h3>Admin</h3>
                        <hr />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Link to={"/admins/add"}>
                            <Button className="btn btn-sm btn-info"> <FaPlus /> New Admins</Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.admins.length === 0
                            ? <p className="text-center">No Data ...</p>
                            : <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Admin Name</th>
                                        <th>Email</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.admins.map((a, i) =>
                                        <tr key={i}>
                                            <td>{no++}</td>
                                            <td>{a.admin_name}</td>
                                            <td>{a.admin_email}</td>
                                            <td>{a.created_at}</td>
                                            <td>
                                                <Link to={"/admins/edit/" + a._id}>
                                                    <Button className="btn btn-sm btn-success mb-2">
                                                        <FaPen />
                                                    </Button>
                                                </Link>

                                                <Button onClick={() => this.delete_admin(a._id)} className="btn btn-sm btn-danger ml-2 mb-2">
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

export default Admin