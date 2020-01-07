import React from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'


class CardDashboard extends React.Component {
    render() {
        return (
            <>
                <Link to={this.props.link}>
                    <Card>
                        <CardBody>
                            <center>
                                {this.props.icon}
                                <br />
                                {this.props.name}
                            </center>
                        </CardBody>
                    </Card>
                </Link>

            </>
        )
    }


}

export default CardDashboard