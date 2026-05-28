import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useStore, VaultItem } from '../store/useStore';
import { MaterialIcons } from '@expo/vector-icons';

export default function VaultScreen({ onThemeToggle }: { onThemeToggle: () => void }) {
  const { items, fetchItems, theme, isProcessing } = useStore();

  useEffect(() => {
    fetchItems();
  }, []);

  const renderItem = ({ item }: { item: VaultItem }) => {
    let accentColor = '#b2cdb6'; // Task (Primary)
    if (item.intent_type === 'note') accentColor = '#b8c8df'; // Note (Tertiary)
    if (item.intent_type === 'event') accentColor = '#c9c4d5'; // Event (Secondary)

    const isLight = theme === 'light';
    const cardBg = isLight ? '#f3f4f6' : '#121412';
    const textMain = isLight ? '#1f201e' : '#e3e2df';
    const textSub = isLight ? '#424843' : '#c2c8c1';
    
    return (
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <View style={[styles.indicator, { backgroundColor: accentColor, shadowColor: accentColor }]} />
        <View style={styles.cardContent}>
          <Text style={[styles.itemTitle, { color: textMain }]} numberOfLines={1}>{item.title}</Text>
          <Text style={[styles.itemSubtitle, { color: textSub }]} numberOfLines={2}>{item.raw_transcript}</Text>
        </View>
      </View>
    );
  };

  const isLight = theme === 'light';
  const bgColor = isLight ? '#ffffff' : '#1b1c1a';
  const textColor = isLight ? '#1f201e' : '#e3e2df';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <MaterialIcons name="inventory-2" size={28} color="#b2cdb6" />
          <Text style={[styles.headerTitle, { color: textColor }]}>The Vault</Text>
        </View>
        <MaterialIcons 
          name={theme === 'dark' ? 'light-mode' : 'dark-mode'} 
          size={24} 
          color="#b2cdb6" 
          onPress={onThemeToggle} 
        />
      </View>
      
      {isProcessing && (
        <View style={styles.processingBanner}>
          <Text style={styles.processingText}>Processing incoming audio...</Text>
        </View>
      )}

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: isLight ? '#424843' : '#c2c8c1' }]}>
              Your vault is empty. Capture a thought to begin.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: -0.5,
  },
  processingBanner: {
    backgroundColor: '#7d9782',
    padding: 8,
    alignItems: 'center',
  },
  processingText: {
    color: '#172e1f',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  listContent: {
    padding: 24,
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    gap: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
