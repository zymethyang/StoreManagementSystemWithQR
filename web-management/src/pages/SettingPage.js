import React from 'react';

import { Row, Col, Button } from 'reactstrap';
import './SettingPage.scss'
// import lib

import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

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


const sliderList = [1, 2, 3, 4, 5, 6]

class CheckPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settingPosition: {
                of_1: 90,
                of_2: 20,
                of_3: 180,
                of_4: 0,
                of_5: 20,
                of_6: 20,
            },
            positionList: [],
            act_id: ""
        }
    }

    async onClickTest() {
        const msg = this.state.settingPosition;
        await PubSub.publish('storage/control', msg);
    }

    onAddList() {
        let { positionList, settingPosition } = this.state;
        let currentPosition = { ...settingPosition };
        positionList.push(currentPosition);
        this.setState({ positionList })
    }

    async onClickSave() {
        let { positionList, act_id } = this.state;
        const msg = { positionList, act_id };
        await PubSub.publish('storage/setting/position', msg);
    }

    onChangeSlider(event) {
        let { settingPosition } = this.state;
        let { name, value } = event.target;
        settingPosition[name] = parseInt(value);
        this.setState({ settingPosition });
    }

    onChangeID(event) {
        let { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { settingPosition, positionList } = this.state;
        return (
            <div className="setting_page--container">
                <Row>
                    <Col>
                        <div className="setting_page--id_input--wrap">
                            <p>Action ID: (scan_1, scan_2, scan_3, scan_4, pick_1, pick_2, pick_3, pick_4)</p>
                            <input name="act_id" type="text" onChange={(event) => this.onChangeID(event)} />
                        </div>
                        {
                            sliderList.map((id, index) => (
                                <div className="setting_page--slider--container" key={index}>
                                    <p>DoF {id}: {settingPosition[`of_${id}`]}</p>
                                    <input type="range" min="0" max="180" value={settingPosition[`of_${id}`]} className="slider" name={`of_${id}`} onChange={(event) => this.onChangeSlider(event)} />
                                </div>))
                        }
                    </Col>
                    <Col>
                        <div className="setting_page--text--container">
                            <p className="setting_page--text--content">{JSON.stringify(positionList)}</p>
                        </div>
                    </Col>
                </Row>
                <div className="setting_page--btn--back">
                    <Button color="info" onClick={() => window.location.href = '/'} onClick={() => this.onClickTest()}>TEST TỌA ĐỘ</Button>{''}
                    <Button style={{ marginLeft: 30, marginRight: 15 }} color="info" onClick={() => this.onAddList()}>THÊM VÀO DANH SÁCH</Button>{''}
                    <Button style={{ marginLeft: 15, marginRight: 30 }} color="success" onClick={() => this.onClickSave()}>LƯU LẠI</Button>{''}
                    <Button color="secondary" onClick={() => window.location.href = '/'}>QUAY LẠI</Button>{''}
                </div>
            </div>
        );
    }
}



export default CheckPage;