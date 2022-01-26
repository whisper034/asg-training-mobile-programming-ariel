import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import AppNavigation from './src/navigation';

const App = () => {
  return (
    <SafeAreaView style={styles.base}>
      <AppNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: {
    display: 'flex',
    flex: 1,
  },
});

export default App;
