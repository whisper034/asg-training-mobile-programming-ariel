import { View, Text, StyleSheet, FlatList, ListRenderItemInfo, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { IUserDetailItem } from '../interfaces';
import { removeFavorites } from '../store/AuthReducer/AuthReducer';

const FavoriteScreen = () => {
  
  const auth = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigateToDetailScreen = (item: string) => {
    navigation.navigate("DetailScreen", {
      item: item
    })
  }
  
  const renderUserItem = (renderItemInfo: ListRenderItemInfo<IUserDetailItem>) => {
    const { item } = renderItemInfo;
    return (
      <TouchableOpacity onPress={() => navigateToDetailScreen(item.login)}>
        <View style={[styles.item, styles.shadowProp]}>
          <Image style={[styles.image1]} source={{uri: item.avatar_url}} />
          <View style={styles.view0_text}>
            <Text style={[styles.dataText, styles.textColor]}>{item.login}</Text>
            <Text style={[styles.textColor]}>{item.type}</Text>
            <Text style={[styles.textColor]}>{item.html_url}</Text>
          </View>
          <TouchableOpacity style={styles.image2} onPress={() => {
              dispatch(removeFavorites(item)),
              Alert.alert(
                "Removed!", "User removed from Favorites!",
                [
                  {
                  },
                ],
                {
                  cancelable: true
                }
              )
            }}>
            <Image style={[styles.image2]} source={require('../../images/trash_icon.png')} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  if(loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.textColor, styles.h5]}>Favorite User List:</Text>
      <FlatList data={auth.item} renderItem={renderUserItem} />
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
    display: "flex",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFF3E4",
    borderRadius: 30,
    padding: 20,
    margin: 5,
    alignItems: "center",
  },

  shadowProp: {
    elevation: 10,
  },

  image1: {
    height: 90,
    width: 90,
    borderRadius: 100,
  },

  image2: {
    height: 30,
    width: 30,
    position: "absolute",
    marginLeft: 173,
  },

  dataText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  view0_text: {
    padding: 10,
    marginLeft: 20
  },
});
