import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { fontSizes, paddingSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things weve focused on</Text>
            <FlatList
              style={{ flex: 1, paddingTop: 16 }}
              contentContainerStyle={{ alignItems: 'center' }}
              data={focusHistory}
              renderItem={({ item, index }) => (
                <Text style={styles.historyItem(item.status)}>
                  {item.subject}
                </Text>
              )}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => clearHistory()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 0 ? 'green' : 'red',
    fontSizes: fontSizes.md,
  }),
  title: {
    color: 'white',
    fontSizes: fontSizes.xl,
  },
  clearContainer: {
    alignItems: 'center',
    paddingBottom: spacing.xl,
  },
});
