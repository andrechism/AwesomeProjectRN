import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';
import { Color } from '../types/Color';
import ColorSquare from './ColorSquare';

interface ButtonProps {
  paletteName: string;
  colors: Color[];
  navigation: StackNavigationProp<any>;
}

const Button = ({ paletteName, colors, navigation }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate('ColorPalette', {
          paletteName,
          colors,
        });
      }}>
      <Text style={styles.text}>{paletteName}</Text>
      <FlatList
        data={colors.slice(0, 5)}
        keyExtractor={item => item.colorName}
        renderItem={({ item }) => <ColorSquare hexCode={item.hexCode} />}
        horizontal={true}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontWeight: 'bold',
    paddingVertical: 4,
    fontSize: 16,
  },

  button: {
    paddingHorizontal: 8,
  },
});

export default Button;
