// ResultsField.js
import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

/**
 * ResultsField
 *
 * Props:
 *   results  Array<{id: string, title: string, author?, series?, flags?}>
 *   query    string   — current search string, used to highlight matches
 */

// Defined outside the component so FlatList always gets the same reference.
const ListEmpty = ({ query }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>
      {query.length === 0 ? 'Start typing to search…' : 'No results found.'}
    </Text>
  </View>
);

const ListHeader = ({ results, query }) =>
  results.length > 0 ? (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {results.length} result{results.length !== 1 ? 's' : ''}
        {query ? ` for "${query}"` : ''}
      </Text>
    </View>
  ) : null;

// Highlight all occurrences of query inside text, without the g-flag .test() bug.
const HighlightedText = ({ text, query, textStyle }) => {
  if (!query || !text) return <Text style={textStyle}>{text}</Text>;

  // No 'g' flag — we only use this regex for splitting, not for .test()
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const splitRegex = new RegExp(`(${escaped})`, 'i');
  const parts = text.split(splitRegex);

  return (
    <Text style={textStyle}>
      {parts.map((part, i) => {
        // Compare directly instead of using a stateful regex
        const isMatch = part.toLowerCase() === query.toLowerCase();
        return isMatch
          ? <Text key={i} style={styles.highlight}>{part}</Text>
          : <Text key={i}>{part}</Text>;
      })}
    </Text>
  );
};

const ResultsField = ({ results = [], query = '' }) => {

  const renderItem = useCallback(({ item, index }) => (
    <View style={[styles.row, index % 2 === 0 ? styles.rowAlt : null]}>
      <View style={styles.rowLeft}>
        {/* Required: title */}
        <HighlightedText text={item.title} query={query} textStyle={styles.itemTitle} />

        {/* Optional: author */}
        {item.author
          ? <HighlightedText text={item.author} query={query} textStyle={styles.itemAuthor} />
          : null}

        {/* Optional: series + flags on the same line */}
        {(item.series || item.flags) ? (
          <View style={styles.metaRow}>
            {item.series
              ? <HighlightedText text={item.series} query={query} textStyle={styles.itemSeries} />
              : null}
            {item.series && item.flags
              ? <Text style={styles.metaSep}>·</Text>
              : null}
            {item.flags
              ? <HighlightedText text={item.flags} query={query} textStyle={styles.itemFlags} />
              : null}
          </View>
        ) : null}
      </View>
      <Text style={styles.itemId}>#{item.id}</Text>
    </View>
  ), [query]);

const keyExtractor = useCallback((item, index) => 
  item.id != null ? String(item.id) : String(index), []);

  return (
    <FlatList
      style={{ flex: 1 }}
      data={results}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={<ListEmpty query={query} />}
      ListHeaderComponent={<ListHeader results={results} query={query} />}
      contentContainerStyle={results.length === 0 ? styles.emptyFill : null}
      keyboardShouldPersistTaps="handled"
      removeClippedSubviews={true}
      initialNumToRender={20}
      maxToRenderPerBatch={30}
      windowSize={10}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  rowAlt: {
    backgroundColor: '#fafafa',
  },
  rowLeft: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  itemAuthor: {
    fontSize: 13,
    color: '#444',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 3,
  },
  itemSeries: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginRight: 4,
  },
  metaSep: {
    fontSize: 12,
    color: '#bbb',
    marginRight: 4,
  },
  itemFlags: {
    fontSize: 12,
    color: '#888',
  },
  itemId: {
    fontSize: 12,
    color: '#bbb',
    marginLeft: 8,
    marginTop: 2,
  },
  highlight: {
    color: '#007AFF',
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 48,
  },
  emptyText: {
    fontSize: 15,
    color: '#aaa',
  },
  emptyFill: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 13,
    color: '#666',
  },
});

export default ResultsField;