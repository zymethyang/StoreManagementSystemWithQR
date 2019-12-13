import React from 'react';
import axios from 'axios';

import { Row, Col, Button } from 'reactstrap';
import './CheckPage.scss'
// import lib

const moment = require('moment');

class CheckPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkList: [],
            name: "",
            checked_time: "",
            block_id: null
        }
    }
    async componentDidMount() {
        const { data } = await axios.get('https://yw5zfexc82.execute-api.ap-southeast-1.amazonaws.com/prod');
        await this.setState({ checkList: data })
    }

    onClickBlock(block_info) {
        this.setState({
            name: block_info[0].name,
            checked_time: `Ngày kiểm tra: ${moment(block_info[0].checked_time).format("hh:mm:ss DD/MM/YYYY")}`,
            block_id: block_info[0].block_id
        })
    }

    onClickClear() {
        this.setState({
            name: "",
            checked_time: "",
            block_id: null
        })
    }

    onClickExport() {

    }

    render() {
        const { checkList, name, checked_time, block_id } = this.state;
        const block_1 = checkList.filter((check) => check.block_id === 'block_1');
        const block_2 = checkList.filter((check) => check.block_id === 'block_2');
        const block_3 = checkList.filter((check) => check.block_id === 'block_3');
        const block_4 = checkList.filter((check) => check.block_id === 'block_4');

        return (
            <div className="check_page--container">
                <Row>
                    <Col>
                        <div className="check_page--store--container">
                            <div className="check_page--store--object" onClick={() => block_1.length > 0 ? this.onClickBlock(block_1) : this.onClickClear()}><p className="check_page--store--object--text">{block_1.length > 0 ? '1' : 'Trống'}</p></div>
                            <div className="check_page--store--object" onClick={() => block_2.length > 0 ? this.onClickBlock(block_2) : this.onClickClear()}><p className="check_page--store--object--text">{block_2.length > 0 ? '2' : 'Trống'}</p></div>
                            <div className="check_page--store--object" onClick={() => block_3.length > 0 ? this.onClickBlock(block_3) : this.onClickClear()}><p className="check_page--store--object--text">{block_3.length > 0 ? '3' : 'Trống'}</p></div>
                            <div className="check_page--store--object" onClick={() => block_4.length > 0 ? this.onClickBlock(block_4) : this.onClickClear()}><p className="check_page--store--object--text">{block_4.length > 0 ? '4' : 'Trống'}</p></div>
                        </div>
                    </Col>
                    <Col>
                        <div className="check_page--store--detail--container">
                            <div><p className="check_page--store--detail--text">{name}</p></div>
                            <div><p className="check_page--store--detail--text">{checked_time}</p></div>
                            {
                                block_id ?
                                    <div>
                                        <Button color="secondary" onClick={() => this.onClickExport()}>Xuất hàng</Button>{''}
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </Col>
                </Row>
                <div className="check_page--btn--back">
                    <Button color="secondary" onClick={() => window.location.href = '/'}>QUAY LẠI</Button>{''}
                </div>
            </div>
        );
    }
}



export default CheckPage;