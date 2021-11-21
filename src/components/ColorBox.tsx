import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ColorBoxProps {
  colorName: string;
  hexCode: string;
}

const ColorBox: React.FC<ColorBoxProps> = ({ colorName, hexCode }) => {
  const viewDynamicStyle = {
    backgroundColor: hexCode,
  };

  const textColor =
    parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.1 ? 'black' : 'white';

  return (
    <View style={[styles.colorBox, viewDynamicStyle]}>
      <Text style={[styles.text, { color: textColor }]}>
        {colorName} {hexCode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },

  colorBox: {
    height: 40,
    marginTop: 10,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
    marginHorizontal: 2,
  },
});

export default ColorBox;
