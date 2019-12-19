import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

class HomeScreen extends React.Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.titleLayout}>
                    <Text style={styles.titleStyle}>Vui lòng chọn</Text>
                </View>
                <View style={styles.btnLayout}>
                    <View style={styles.btnLayoutChildLeft}>
                        <Button title="Kiểm hàng"
                            onPress={() => navigate('Scan', { role: 'check' })} />
                    </View>
                    {/* 
                    <View style={styles.btnLayoutChildRight}>
                        <Button title="Xuất hàng"
                            color="#f194ff"
                            onPress={() => navigate('Scan', { role: 'export' })} />
                    </View>
                    */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

        alignItems: 'center',
        justifyContent: 'center'
    },
    titleLayout: {
        marginTop: '40%'
    },
    btnLayout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

        marginTop: 40
    },
    btnLayoutChildLeft: {
        marginRight: 30
    },
    btnLayoutChildRight: {
        marginLeft: 30
    },
    titleStyle: {
        fontFamily: 'quicksand-semibold',
        color: 'black',
        fontSize: 28
    }
})

export default HomeScreen;