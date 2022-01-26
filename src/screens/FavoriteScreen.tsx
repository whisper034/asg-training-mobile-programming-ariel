import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootStackParamList';

const FavoriteScreen = () => {
  
  const route = useRoute<RouteProp<RootStackParamList, "FavoriteScreen">>();
  const login = route.params.item;

  return (
    <View style={styles.container}>
      <Text style={[styles.textColor, styles.h5]}>Favorite User List:</Text>
      <FlatList data={data} renderItem={renderUserItem} />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: "#f5c78d",
    padding: 5
  },

  loadingContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textColor: {
    color: "black"
  },

  h5: {
    fontSize: 18,
    marginBottom: 3,
  },

  item: {
    backgroundColor: "#FFF3E4",
    borderWidth: 2,
    borderRadius: 30,
    padding: 20,
    margin: 3,
    alignItems: "center",
  },

  shadowProp: {
    elevation: 10,
  },

  image: {
    height: 100,
    width: 100,
  },

  dataText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
