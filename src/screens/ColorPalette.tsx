import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  // SectionList,
} from 'react-native';

import 'react-native-gesture-handler';
import ColorBox from '../components/ColorBox';

// const foodList = [
//   { title: 'Fruit', data: ['Apple', 'Banana', 'Orange'] },
//   { title: 'Vegetables', data: ['Carrot', 'Potato', 'Onion'] },
//   { title: 'Dairy', data: ['Milk', 'Cheese', 'Yogurt'] },
// ];

const ColorPalette = ({ route }) => {
  const { colors } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container]}>
        {/* <Text style={styles.title}>Solarized</Text> */}
        <FlatList
          data={colors}
          keyExtractor={item => item.colorName}
          renderItem={({ item }) => (
            <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
          )}
        />

        {/* <SectionList
          sections={foodList}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Text style={{marginLeft: 10}}>{item}</Text>}
          renderSectionHeader={({section}) => (
            <Text style={{color: 'red', marginTop: 10}}>{section.title}</Text>
            )}
            ListEmptyComponent={() => <Text>No data</Text>}
            ListHeaderComponent={() => <Text>Header</Text>}
            ListFooterComponent={() => <Text>End of list</Text>}
          /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    color: '#000',
    fontSize: 18,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  safeArea: {
    flex: 2,
    backgroundColor: 'white',
  },
});

export default ColorPalette;
