import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';

import { fontSizes, paddingSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/color.js';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);

  return (
      <View style={styles.container}>
        <Text style={styles.titleContainer}>What you like to focus on?</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
          />

          <RoundedButton
            size={50}
            title="+"
            onPress={() => {
              addSubject(subject);
            }}
          />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    padding: paddingSizes.md,
    justifyContent: 'center',
  },
  titleContainer: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: paddingSizes.md,
  },
  textInput: {
    flex: 1,
    marginRight: spacing.md,
  },
});
