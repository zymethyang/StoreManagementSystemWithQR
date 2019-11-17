import React from 'react';
import { Container, Row, Col } from 'reactstrap';

class Header extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>GVHD: TRẦN VŨ HOÀNG</h3>
                        <h3>SVTH 1: LƯU THANH TRỌNG</h3>
                        <h3>SVTH 2: TRẦN THIỆN KHANG</h3>
                        <h3>ĐỒ ÁN TỐT NGHIỆP</h3>
                    </Col>
                </Row>
            </Container>);
    }
}

export default Header;