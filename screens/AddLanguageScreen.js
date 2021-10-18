import React, {useState, useRef} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import Icon from 'react-native-vector-icons/Ionicons';
import {put} from '../services/api.service'

const items = [{
  id: 'hebrew',
  name: 'עברית'
}, {
  id: 'arabic',
  name: 'ערבית'
}, {
  id: 'english',
  name: 'אנגלית'
}, {
  id: 'russian',
  name: 'רוסית'
}, {
  id: 'french',
  name: 'צרפתית'
}, {
  id: 'spanish',
  name: 'ספרדית'
}, {
  id: 'torkuis',
  name: 'טורקית'
}
];

const styles = StyleSheet.create({
  buttonCircle: {
    width: 60,
    height: 60,
    backgroundColor: '#28527A',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20
  }
});

export default function AddLanguageScreen({ navigation }) {
const [selectedItems, setSelectedItems] = useState([]);
const multiSelectRef = useRef();

const onSelectedItemsChange = selectedItems => {
  setSelectedItems(selectedItems)
};

const onApply = async (selectedItems) => {
  try{
    console.log(selectedItems);
    await put('/api/seeker/languages', selectedItems);
    navigation.replace('SkillsQuestions');
  } catch (e) {
    console.log(e)
  }
}

return (
  <View style={{ flex: 1 , marginTop: 20}}>
    <Text style={{fontSize: 20}}>הוסף שפה</Text>
    <MultiSelect
      items={items}
      uniqueKey="id"
      ref={(component) => { multiSelectRef.current = component }}
      onSelectedItemsChange={onSelectedItemsChange}
      selectedItems={selectedItems}
      selectText="הקלד שפה"
      searchInputPlaceholderText="הקלד שפה"
      onChangeInput={ (text)=> console.log(text)}
      altFontFamily="Rubik_400Regular"
      tagRemoveIconColor="#28527A"
      tagBorderColor="#FFF"
      tagTextColor="#2E2E2E"
      selectedItemTextColor="#2E2E2E"
      selectedItemIconColor="#2E2E2E"
      itemTextColor="#2E2E2E"
      displayKey="name"
      searchInputStyle={{ color: '#2E2E2E', fontSize: 25}}
      submitButtonColor="#28527A"
      submitButtonText="הוסף"
    />

    <View style={styles.buttonCircle}>
        <Icon
          name='arrow-back-outline'
          type='ionicon'
          color='white'
          size={28}
          onPress={() => {onApply(selectedItems)}}
        />
    </View>
  </View>
  )
}
