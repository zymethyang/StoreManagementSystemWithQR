import React from 'react';
import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import { Row, Col, Button } from 'reactstrap';
import './CheckPage.scss'
import axios from 'axios';
const moment = require('moment');


Amplify.configure({
    Auth: {
        identityPoolId: 'ap-southeast-1:40c61ae2-4b83-4e6d-b0a7-6216a600407f',
        region: 'ap-southeast-1',
    }
})

Amplify.addPluggable(new AWSIoTProvider({
    aws_pubsub_region: 'ap-southeast-1',
    aws_pubsub_endpoint: 'wss://a162573iz22qwr-ats.iot.ap-southeast-1.amazonaws.com/mqtt',
}));


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
        console.log(block_info[0].checked_time);
        this.setState({
            name: block_info[0].name,
            checked_time: `Ngày kiểm tra: ${block_info[0].checked_time.toString().split("T")[0]} ${block_info[0].checked_time.toString().split("T")[1].split(".")[0]}`,
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

    async onClickExport(block_id) {
        let msg;
        switch (block_id) {
            case 'block_1':
                msg = { act_id: 'pick_1' };
                await PubSub.publish('storage/client/control', msg);
                break;
            case 'block_2':
                msg = { act_id: 'pick_2' };
                await PubSub.publish('storage/client/control', msg);
                break;
        }
    }

    async onClickCheck() {
        let msg;
        msg = { act_id: 'scan_1' };
        await PubSub.publish('storage/client/control', msg);
        setTimeout(async () => {
            msg = { act_id: 'scan_2' };
            await PubSub.publish('storage/client/control', msg);
        }, 10000)
    }

    render() {
        const { checkList, name, checked_time, block_id } = this.state;
        const block_1 = checkList.filter((check) => check.block_id === 'block_1');
        const block_2 = checkList.filter((check) => check.block_id === 'block_2');

        return (
            <div className="check_page--container">
                <Row>
                    <Col>
                        <div className="check_page--store--container">
                            <div className="check_page--store--object" onClick={() => block_1.length > 0 ? this.onClickBlock(block_1) : this.onClickClear()}><p className="check_page--store--object--text">{block_1.length > 0 ? '1' : 'Trống'}</p></div>
                            <div className="check_page--store--object" onClick={() => block_2.length > 0 ? this.onClickBlock(block_2) : this.onClickClear()}><p className="check_page--store--object--text">{block_2.length > 0 ? '2' : 'Trống'}</p></div>
                        </div>
                    </Col>
                    <Col>
                        <div className="check_page--store--detail--container">
                            <div><p className="check_page--store--detail--text">{name}</p></div>
                            <div><p className="check_page--store--detail--text">{checked_time}</p></div>
                            {
                                block_id ?
                                    <div>
                                        <Button color="secondary" onClick={() => this.onClickExport(block_id)}>Xuất hàng</Button>{''}
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </Col>
                </Row>
                <div className="check_page--btn--back">
                    <Button color="secondary" onClick={() => window.location.href = '/'}>QUAY LẠI</Button>{''}
                    <Button style={{ marginLeft: 20 }} color="secondary" onClick={() => this.onClickCheck()}>KIỂM TRA</Button>{''}
                </div>
            </div>
        );
    }
}



export default CheckPage;