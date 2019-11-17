import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';

// import lib

class HomePage extends React.Component {
    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col>
                            <Button color="success" onClick={() => window.location.href = '/check'}>Kiểm tra</Button>{''}
                        </Col>
                        <Col>
                            <Button color="success" onClick={() => window.location.href = '/export'}>Xuất hàng</Button>{''}
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}



export default HomePage;