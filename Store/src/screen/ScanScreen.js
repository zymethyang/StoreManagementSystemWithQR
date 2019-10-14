import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

const firebase = require('../shared/firebase');
const database = firebase.database();

class ScanScreen extends React.Component {
    state = {
        hasCameraPermission: null,
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

        await database.ref('/scan_session').set({
            role: params.role,
            data: data
        });

        if (params.role === 'export') {
            Alert.alert('Thông báo', 'Đã quét xong');
            goBack();
        }
    };
}

export default ScanScreen;