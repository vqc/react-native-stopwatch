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
      startTime: null,
      laps: [],
    }
    this.handleStartPress = this.handleStartPress.bind(this);
    this.handleLapPress = this.handleLapPress.bind(this);
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
          {this.laps()}
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
        onPress={this.handleLapPress}
        style={[styles.button]}
      >
        <Text style={styles.instructions}>
          Lap
        </Text>
      </TouchableHighlight>
    )
  }
  laps(){
    return this.state.laps.map((lap, index)=>{
        return (
          <View key={index} style={styles.lap}>
            <Text style={styles.lapText}>
              Lap #{index+1}
            </Text>
            <Text style={styles.lapText}>
              {formatTime(lap)}
            </Text>
          </View>
        )
      }
    )
  }
  handleStartPress(){
    if(this.state.running){
      clearInterval(this.interval);
      this.setState({ running: false });
      return;
    }

    this.setState ({ startTime: new Date()});
    //startTime will be the time at which user touches the buttonWrapper
    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true,
      });
    }, 30);
  }
  handleLapPress(){
    if(this.state.running){
      const lap = this.state.timeElapsed;
      this.setState({ startTime: new Date(), laps: this.state.laps.concat([lap]) })
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
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  lapText:{
    fontSize: 30,
  },
});

AppRegistry.registerComponent('reactNativeStopwatch', () => StopWatch);
