import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';

const DATA_FILE_PATH = FileSystem.documentDirectory + 'data.json';

export default function ResetButton({ onReset }) {
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    Alert.alert(
      'Reset Data',
      'This will overwrite the current data.json with a new file. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', style: 'destructive', onPress: pickAndOverwrite },
      ]
    );
  };

  const pickAndOverwrite = async () => {
    try {
      setLoading(true);

      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const pickedUri = result.assets[0].uri;

      const content = await FileSystem.readAsStringAsync(pickedUri, {
        encoding: 'utf8',
      });

      await FileSystem.writeAsStringAsync(DATA_FILE_PATH, content, {
        encoding: 'utf8',
      });

      Alert.alert('Success', 'data.json has been successfully reset.');
      onReset?.();
    } catch (error) {
      console.error('ResetButton error:', error);
      Alert.alert('Error', 'Something went wrong while resetting the file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, loading && styles.buttonDisabled]}
      onPress={handleReset}
      disabled={loading}
      accessibilityLabel="Reset data file"
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.label}>Reset Data</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e53935',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
  },
  buttonDisabled: {
    backgroundColor: '#ef9a9a',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});