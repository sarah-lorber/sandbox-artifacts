import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import SearchMachine from './components/SearchMachine';

export default function App() {
  return (
    <View style={styles.container}>
      <Card style={{ flex: 1 }}>
              <SearchMachine />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    backgroundColor: 'indigo',
    paddingTop: 100,
    padding: 8,
  },
});
