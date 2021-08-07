import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Draggable from './Draggable';

const App = () => {
  const [dropArea, setDropArea] = useState({});

  function findPositionAndDimensions(e) {
    const layout = e.nativeEvent.layout;
    const {x, y, width, height} = layout;

    setDropArea({
      x: Math.trunc(x),
      y: Math.trunc(y),
      width: Math.trunc(width),
      height: Math.trunc(height),
    });
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.dropZone} onLayout={findPositionAndDimensions}>
        <Text style={styles.text}>Drop them here!</Text>
      </View>

      <View style={styles.ballContainer} />

      <View style={styles.row}>
        <Draggable dropArea={dropArea} />
        <Draggable dropArea={dropArea} />
        <Draggable dropArea={dropArea} />
        <Draggable dropArea={dropArea} />
        <Draggable dropArea={dropArea} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  ballContainer: {
    height: 200,
  },
  row: {
    flexDirection: 'row',
  },
  dropZone: {
    height: 200,
    backgroundColor: '#00334d',
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default App;
