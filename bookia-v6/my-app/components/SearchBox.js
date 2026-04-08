// SearchBox.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

/**
 * SearchBox
 *
 * Props:
 *   onSearchChange (string) => void   — called on every keystroke
 */
const SearchBox = ({ onSearchChange }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (text) => {
    setSearchText(text);
    onSearchChange(text);
  };

  const handleClear = () => {
    setSearchText('');
    onSearchChange('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={handleChange}
        placeholder="Search…"
        placeholderTextColor="#999"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="never" // We draw our own clear button
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  clearBtn: {
    padding: 4,
  },
  clearText: {
    fontSize: 14,
    color: '#888',
  },
});

export default SearchBox;