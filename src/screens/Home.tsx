import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Button from '../components/Button';

// import { FRONTEND_MASTERS, SOLARIZED, RAINBOW } from '../utils/colorList';

// const COLOR_PALETTES = [
//   { paletteName: 'Solarized', colors: SOLARIZED },
//   { paletteName: 'Rainbow', colors: RAINBOW },
//   { paletteName: 'Frontend Masters', colors: FRONTEND_MASTERS },
// ];

const Home = ({ navigation, route }) => {
  const newColorPalette = route.params?.newColorPalette;
  const [colorPalettes, setColorPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchColorPalettes = useCallback(async () => {
    const response = await fetch(
      'https://color-palette-api.kadikraman.vercel.app/palettes',
    );

    if (response.ok) {
      const palettes = await response.json();
      setColorPalettes(palettes);
    }
  }, []);

  useEffect(() => {
    fetchColorPalettes();
  }, []);

  useEffect(() => {
    if (newColorPalette) {
      setColorPalettes(prevPalettes => [newColorPalette, ...prevPalettes]);
    }
  }, [newColorPalette]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchColorPalettes();
    setIsRefreshing(false);
  }, []);

  return (
    <View>
      <FlatList
        data={colorPalettes}
        keyExtractor={(item, index) => item.paletteName + index}
        renderItem={({ item }) => (
          <Button
            paletteName={item.paletteName}
            colors={item.colors}
            navigation={navigation}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ColorPaletteModal');
            }}>
            <Text style={styles.ButtonText}>Add a color scheme</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ButtonText: {
    fontSize: 20,
    color: 'teal',
    fontWeight: 'bold',
    padding: 10,
  },
});

export default Home;
