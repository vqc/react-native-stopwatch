'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import formatTime from 'minutes-seconds-milliseconds';

class StopWatch extends Component {
  constructor(props){
    super(props);
    this.state = {
      timeElapsed: null,
      running: false,
    }
    this.handleStartPress = this.handleStartPress.bind(this);
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={[styles.header]}>
          <View style={[styles.timerWrapper]}>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
          </Text>
          </View>
          <View style={[styles.buttonWrapper]}>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>

        <View style={[styles.footer]}>
          <Text>
            I am a list of Laps.
          </Text>
        </View>

      </View>
    );
  }
  startStopButton(){
    const style = this.state.running ? styles.stopButton : styles.startButton;
    return(
      <TouchableHighlight
        underlayColor="gray"
        onPress={this.handleStartPress}
        style={[styles.button, style]}
      >
          <Text style={styles.instructions}>
            {this.state.running ? 'Stop' : 'Start' }
          </Text>
      </TouchableHighlight>
    )
  }
  lapButton(){
    return(
      <TouchableHighlight
        underlayColor="gray"
        onPress={this.handeLapPress}
        style={[styles.button]}
      >
        <Text style={styles.instructions}>
          Lap
        </Text>
      </TouchableHighlight>
    )
  }
  handleStartPress(){
    if(this.state.running){
      clearInterval(this.interval);
      this.setState({
        running: false,
      });
      return;
    }
    const startTime = new Date();
    //startTime will be the time at which user touches the buttonWrapper
    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - startTime,
        running: true,
      });
    }, 30);
  }
  handleLapPress(){

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
  startButton:{
    borderColor: '#00CC00',
  },
  stopButton:{
    borderColor: '#CC0000',
  },
  footer: {
    flex:1,
  },
  timer:{
    fontSize: 60,
  },
  button:{
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

AppRegistry.registerComponent('reactNativeStopwatch', () => StopWatch);
