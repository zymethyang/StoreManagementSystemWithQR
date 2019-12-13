import * as React from 'react';
import * as Font from 'expo-font';
import AppNavigator from './src/component/AppNavigator';

class App extends React.Component {
  state = {
    fontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      'quicksand-medium': require('./assets/fonts/Quicksand-Medium.ttf'),
      'quicksand-semibold': require('./assets/fonts/Quicksand-SemiBold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    return (
      <>
        {this.state.fontLoaded ? <AppNavigator /> : null}
      </>
    )
  }
}

export default App;