// SearchMachine.js
import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import SearchBox from './SearchBox';
import ResultsField from './ResultsField';
import rawData from './data.json';

const safeRegex = (query) => {
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(escaped, 'i');
};

const SearchMachine = () => {
  const [displayedResults, setDisplayedResults] = useState([]);
  const [currentQuery, setCurrentQuery]         = useState('');
  const searchTexts = useRef([]);
  const resultsList = useRef([]);

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
  }, []);

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
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
});

export default SearchMachine;