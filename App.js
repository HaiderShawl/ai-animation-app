import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import GIF from './components/GIF';
import Login from './components/Login';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <View style={styles.container}>
      {!loggedIn ? (
        <Login onLogin={() => setLoggedIn(true)} />
      ) : (
        <>
          <Text style={styles.paragraph}>
            AI Animation Generator
          </Text>
          <Card>
            <GIF />
          </Card>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
