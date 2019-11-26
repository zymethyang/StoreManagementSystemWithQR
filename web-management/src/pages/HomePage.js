import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';

import './HomePage.scss';

class HomePage extends React.Component {
    render() {
        return (
            <div className="home--container">
                <div className="home--left" onClick={() => window.location.href = '/check'}>
                    <img src="check-icon.png" className="home--check_icon" />
                    <div className="home--text">KIỂM TRA</div>
                </div>
                <div className="home--right" onClick={() => window.location.href = '/export'}>
                    <img src="export-icon.png" className="home--export_icon" />
                    <div className="home--text">XUẤT HÀNG</div>
                </div>
            </div>
        );
    }
}



export default HomePage;