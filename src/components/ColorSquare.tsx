import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface ColorSquareProps {
  hexCode: string;
}

const ColorSquare = ({ hexCode }: ColorSquareProps) => {
  return <View style={[styles.square, { backgroundColor: hexCode }]}></View>;
};

const styles = StyleSheet.create({
  square: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
    marginVertical: 2,
  },
});

export default ColorSquare;
