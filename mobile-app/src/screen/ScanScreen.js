import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

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


class ScanScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        data: null
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}>
                <BarCodeScanner
                    onBarCodeScanned={(event) => this.handleBarCodeScanned(event)}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
        );
    }

    handleBarCodeScanned = async ({ type, data }) => {
        const { params } = this.props.navigation.state;
        const { goBack } = this.props.navigation;
        if (params.role === 'check') {
            await PubSub.publish('storage/client/qr', JSON.parse(data));
        }

        if (params.role === 'export') {
            const { block_id } = JSON.parse(data);

            switch (block_id) {
                case 'block_1':
                    msg = { act_id: 'pick_1' };
                    await PubSub.publish('storage/client/control', msg);
                    break;
                case 'block_2':
                    msg = { act_id: 'pick_2' };
                    await PubSub.publish('storage/client/control', msg);
                    break;
                default:
                Alert.alert('Thông báo', 'Không có hàng trong kho!');
            }
            Alert.alert('Thông báo', 'Đã quét xong');
            goBack();
        }
    };
}

export default ScanScreen;