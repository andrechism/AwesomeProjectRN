import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ColorSquare from '../components/ColorSquare';
import { COLORS } from '../utils/colorList';

const ColorSwitch = ({ colorData, setSelectedColors }) => {
  const [isActive, setIsActive] = useState(false);
  const { colorName, hexCode } = colorData;

  const handleSelection = useCallback(() => {
    setSelectedColors(prevSelectedColors => {
      if (isActive) {
        return [...prevSelectedColors, colorData];
      } else {
        return prevSelectedColors.filter(item => item.hexCode !== hexCode);
      }
    });
  }, [isActive]);

  useEffect(() => {
    handleSelection();
  }, [isActive]);

  return (
    <View style={styles.ColorSwitchItem}>
      <ColorSquare hexCode={hexCode} />
      <Text>{colorName}</Text>

      <Switch
        style={styles.ColorSwitch}
        value={isActive}
        onValueChange={setIsActive}
      />
    </View>
  );
};

const ColorPaletteModal = ({ navigation, route }) => {
  const [paletteName, setPaletteName] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);

  const { setColorPalettes } = route.params;

  const handleSubmit = useCallback(() => {
    if (!paletteName) {
      alert('Please enter a palette name');
      return;
    }
    if (selectedColors.length < 3) {
      alert('Please select at least three colors');
      return;
    }

    const newPalette = {
      paletteName,
      colors: selectedColors,
    };

    setColorPalettes(prevColorPalettes => [newPalette, ...prevColorPalettes]);

    navigation.goBack();
  }, [paletteName, selectedColors]);

  return (
    <View>
      <Text style={styles.TextInputTitle}>Name of your color palette</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Palette Name"
        value={paletteName}
        onChangeText={setPaletteName}
      />

      <FlatList
        style={styles.List}
        data={COLORS}
        keyExtractor={item => item.colorName + item.hexCode}
        renderItem={({ item }) => (
          <ColorSwitch colorData={item} setSelectedColors={setSelectedColors} />
        )}
      />

      {/* <Text>Selected Colors: {selectedColors.join(', ')}</Text> */}

      <TouchableOpacity onPress={handleSubmit} style={styles.SubmitButton}>
        <Text style={styles.SubmitButtonText}>Submit!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInputTitle: {
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  TextInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },

  ColorSwitchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  ColorSwitch: {
    marginLeft: 'auto',
  },

  SubmitButton: {
    backgroundColor: '#0066ff',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 5,
    // flex: 1,
  },

  SubmitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  List: {
    marginTop: 12,
    maxHeight: '78%',
  },
});

export default ColorPaletteModal;
