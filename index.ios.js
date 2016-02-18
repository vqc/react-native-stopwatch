'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native'

class StopWatch extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={[this.border('yellow'), styles.header]}>
          <View style={[styles.timerWrapper, this.border('red')]}>
          <Text>
            00:00.00
          </Text>
          </View>
          <View style={[styles.buttonWrapper, this.border('green')]}>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>

        <View style={[this.border('blue'), styles.footer]}>
          <Text style={this.border('red')}>
            I am a list of Laps.
          </Text>
        </View>

      </View>
    );
  }
  startStopButton(){
    return(
      <TouchableHighlight
        underlayColor="gray"
        onPress={this.handleStartPress}
      >
        <Text style={styles.instructions}>
          Start
        </Text>
      </TouchableHighlight>
    )
  }
  lapButton(){
    return(
      <View>
        <Text style={styles.instructions}>
          Lap
        </Text>
      </View>
    )
  }
  handleStartPress(){
    console.log('start was pressed');
  }
  border(color){
     return {
       borderColor: color,
       borderWidth:4,
     }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  header: {
    flex:1,
  },
  timerWrapper:{
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper:{
    flex: 3,
    //so that it goes left to right instead of up and down
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footer: {
    flex:1,
  },
});

AppRegistry.registerComponent('reactNativeStopwatch', () => StopWatch);
