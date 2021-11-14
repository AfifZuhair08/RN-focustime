import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage'

// You can import from local files
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { FocusHistory } from './src/features/focus/FocusHistory';

// Styling
import { colors } from './src/utils/color';
import { spacing } from './src/utils/sizes';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const STATUS = {
  COMPLETED: 1,
  CANCELLED: 0,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorysSubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { key: String(focusHistory.length + 1), subject, status }]);
  };

  console.log(focusHistory);

  // clear hsitory
  const onClear = () => {
    setFocusHistory([]);
  }

  // save history into local
  const saveFocusHistory = async () => {
    try{
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory))
    }catch(e){
      console.log(e)
    }
  }

  // load history from local
  const loadFocusHistory = async () => {
    try{
      const history = await AsyncStorage.getItem("focusHistory");

      if(history && JSON.parse(history).length){
        setFocusHistory(JSON.parse(history));
      }
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    loadFocusHistory();
  },[])

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory])

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorysSubjectWithStatus(focusSubject, STATUS.COMPLETED);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorysSubjectWithStatus(focusSubject, STATUS.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'iOS' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
