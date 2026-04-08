// SearchMachine.js
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

import SearchBox from './SearchBox';
import ResultsField from './ResultsField';
import bundledData from './data.json';

const DATA_FILE_PATH = FileSystem.documentDirectory + 'data.json';

const safeRegex = (query) => {
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(escaped, 'i');
};

const SearchMachine = ({ resetKey = 0 }) => {
  const [rawData, setRawData]                   = useState(bundledData);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [currentQuery, setCurrentQuery]         = useState('');
  const searchTexts = useRef([]);
  const resultsList = useRef([]);

  useEffect(() => {
    // On first load, bundledData is already the initial state — nothing to do
    if (resetKey === 0) return;

    // After a reset, read the new file from the filesystem
    const loadData = async () => {
      try {
        const json = await FileSystem.readAsStringAsync(DATA_FILE_PATH, { encoding: 'utf8' });
        setRawData(JSON.parse(json));
      } catch (e) {
        console.error('SearchMachine failed to load data:', e);
      }
    };

    loadData();
    searchTexts.current = [];
    resultsList.current = [];
    setDisplayedResults([]);
    setCurrentQuery('');
  }, [resetKey]);

  const handleSearchChange = useCallback((text) => {
    const len = text.length;
    setCurrentQuery(text);

    if (len === 0) {
      searchTexts.current = [];
      resultsList.current = [];
      setDisplayedResults([]);
      return;
    }

    if (
      searchTexts.current[len] === text &&
      resultsList.current[len] !== undefined
    ) {
      setDisplayedResults(resultsList.current[len]);
      return;
    }

    searchTexts.current[len] = text;

    const pattern    = safeRegex(text);
    const sourceList = len === 1
      ? rawData
      : resultsList.current[len - 1] ?? [];

    const filtered = sourceList.filter((item) => {
      const searchable = [
        item.title,
        item.author ?? '',
        item.series ?? '',
        item.flags  ?? '',
      ].join(' ');
      return searchable.match(pattern) !== null;
    });

    resultsList.current[len] = filtered;
    setDisplayedResults(filtered);
  }, [rawData]);

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <SearchBox onSearchChange={handleSearchChange} />
        <ResultsField results={displayedResults} query={currentQuery} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
});

export default SearchMachine;