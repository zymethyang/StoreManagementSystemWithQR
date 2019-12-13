import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import HomeScreen from '../screen/HomeScreen';
import ScanScreen from '../screen/ScanScreen';


const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Scan: {
        screen: ScanScreen,
    },
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export default createAppContainer(AppNavigator);