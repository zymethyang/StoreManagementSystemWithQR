import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Header.scss';

class Header extends React.Component {
    render() {
        return (
            <div className="header--container">
                <div className="header--left">
                    <img src="logo-main.png" className="header--logo" />
                </div>
                <div className="header--right">
                    <h3 className="header--text">GVHD: TRẦN VŨ HOÀNG</h3>
                    <h3 className="header--text">SVTH 1: LƯU THANH TRỌNG</h3>
                    <h3 className="header--text">SVTH 2: TRẦN THIỆN KHANG</h3>
                    <h3 className="header--text">ĐỒ ÁN TỐT NGHIỆP</h3>
                </div>
            </div>
            /*<Container>
                <Row>
                    <Col>
                        <h3>GVHD: TRẦN VŨ HOÀNG</h3>
                        <h3>SVTH 1: LƯU THANH TRỌNG</h3>
                        <h3>SVTH 2: TRẦN THIỆN KHANG</h3>
                        <h3>ĐỒ ÁN TỐT NGHIỆP</h3>
                    </Col>
                </Row>
            </Container>*/);
    }
}

export default Header;