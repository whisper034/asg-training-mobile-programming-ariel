import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppNavigation from './src/navigation';
import { PersistStore, store } from './src/store';

const App = () => {
  return (
    <SafeAreaView style={styles.base}>
      <Provider store={store}>
        <PersistGate persistor={PersistStore}>
          <AppNavigation />
        </PersistGate>
      </Provider>
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
