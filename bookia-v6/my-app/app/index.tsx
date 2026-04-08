import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchMachine from '../components/SearchMachine';
import ResetButton from '../components/ResetButton';

export default function App() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <View style={styles.container}>
      <ResetButton onReset={() => setResetKey(k => k + 1)} />
      <View style={{ flex: 1 }}>
        <SearchMachine resetKey={resetKey} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'indigo',
    paddingTop: 100,
    padding: 8,
  },
});