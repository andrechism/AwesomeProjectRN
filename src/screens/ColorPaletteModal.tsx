import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ColorSquare from '../components/ColorSquare';
import { COLORS } from '../utils/colorList';

// const ColorSwitch = ({ colorData, setSelectedColors }) => {
//   const [isActive, setIsActive] = useState(false);
//   const { colorName, hexCode } = colorData;

//   const handleSelection = useCallback(() => {
//     setSelectedColors(prevSelectedColors => {
//       if (isActive) {
//         return [...prevSelectedColors, colorData];
//       } else {
//         return prevSelectedColors.filter(item => item.hexCode !== hexCode);
//       }
//     });
//   }, [isActive]);

//   useEffect(() => {
//     handleSelection();
//   }, [isActive]);

//   return (
//     <View style={styles.ColorSwitchItem}>
//       <ColorSquare hexCode={hexCode} />
//       <Text style={styles.ColorSwitchItemText}>{colorName}</Text>

//       <Switch
//         style={styles.ColorSwitch}
//         value={isActive}
//         onValueChange={setIsActive}
//       />
//     </View>
//   );
// };

const ColorPaletteModal = ({ navigation, route }) => {
  const [paletteName, setPaletteName] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);

  // const { setColorPalettes } = route.params;

  const handleSubmit = useCallback(() => {
    if (!paletteName) {
      Alert.alert('Please enter a palette name');
      return;
    }
    if (selectedColors.length < 3) {
      Alert.alert('Please select at least three colors');
      return;
    }

    const newColorPalette = {
      paletteName,
      colors: selectedColors,
    };

    // setColorPalettes(prevColorPalettes => [newPalette, ...prevColorPalettes]);

    navigation.navigate('Home', { newColorPalette });

    // navigation.goBack();
  }, [paletteName, selectedColors]);

  const handleValueChange = useCallback((value, color) => {
    if (value) {
      setSelectedColors(prevSelectedColors => [...prevSelectedColors, color]);
    } else {
      setSelectedColors(prevSelectedColors =>
        prevSelectedColors.filter(item => item.colorName !== color.colorName),
      );
    }
  }, []);

  return (
    <View>
      <Text style={styles.TextInputTitle}>Name of your color palette</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Palette Name"
        value={paletteName}
        onChangeText={setPaletteName}
        placeholderTextColor="gray"
      />

      <FlatList
        style={styles.List}
        data={COLORS}
        keyExtractor={item => item.colorName + item.hexCode}
        renderItem={({ item }) => (
          // <ColorSwitch colorData={item} setSelectedColors={setSelectedColors} />
          <View style={styles.ColorSwitchItem}>
            <ColorSquare hexCode={item.hexCode} />
            <Text style={styles.ColorSwitchItemText}>{item.colorName}</Text>

            <Switch
              style={styles.ColorSwitch}
              value={
                !!selectedColors.find(
                  color => color.colorName === item.colorName,
                )
              }
              onValueChange={selected => {
                handleValueChange(selected, item);
              }}
            />
          </View>
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
    color: '#000',
  },

  TextInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    color: '#000',
  },

  ColorSwitchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  ColorSwitchItemText: {
    color: '#000',
  },

  ColorSwitch: {
    marginLeft: 'auto',
  },

  SubmitButton: {
    backgroundColor: 'teal',
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
