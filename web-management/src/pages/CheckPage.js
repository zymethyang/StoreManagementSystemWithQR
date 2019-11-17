import React from 'react';
import { Table } from 'reactstrap';

import { Container, Row, Col, Button } from 'reactstrap';

// import lib

const firebase = require('../shared/firebase');
require('firebase/database');
const moment = require('moment');

class CheckPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkList: []
        }
    }
    componentDidMount() {
        firebase.database().ref('/log').on('value', dataStream => {
            let checkList = []
            dataStream.forEach((check) => {
                const { role } = check.val();
                if (role === 'check') {
                    checkList.push(check.val())
                }
            })
            this.setState({ checkList })
        });
    }
    render() {
        const { checkList } = this.state;
        return (
            <>
                <Container>
                    <Row>
                        <Col>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời gian</th>
                                        <th>Xóa lịch sử</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        checkList.map((check, index) =>
                                            (<tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{moment.unix(check.date).format('hh:mm:ss - DD/MM/YYYY')}</td>
                                                <td><i className="material-icons" style={{ cursor: 'pointer', color: 'red' }}>delete</i></td>
                                            </tr>))
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Button color="secondary" onClick={() => window.location.href = '/'}>QUAY LẠI</Button>{''}
                    </Row>
                </Container>
            </>
        );
    }
}



export default CheckPage;