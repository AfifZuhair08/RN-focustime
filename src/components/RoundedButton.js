import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { fontSizes, paddingSized } from "../utils/sizes"

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 80,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles(size).radius, style]}
      onPress={props.onPress}>
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: "center",
      borderColor: 'white',
      borderWidth: 2,
    },
    text: {
      color: 'white',
      fontSize: size / 2.8,
    },
  });
