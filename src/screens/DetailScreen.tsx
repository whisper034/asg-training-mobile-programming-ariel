import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { IUserDetailItem, IUserListItem } from '../interfaces';

const DetailScreen = () => {

  const route = useRoute<RouteProp<RootStackParamList, "DetailScreen">>();
  const login = route.params.item;
  const [data, setData] = useState<IUserDetailItem>();
  const [loading, setLoading] = useState(false);
  const [favoriteList, setFavoriteList] = React.useState([]);

  const onFavorite = (user: never) => {
    setFavoriteList([...favoriteList, user]);
  };

  const onRemoveFavorite = (user: string) => {
    const filteredList = favoriteList.filter(
      item => item.login !== user.login
    );
    setFavoriteList(filteredList);
  };

  const ifExists = (user: never) => {
    if (favoriteList.filter(item => item.login === user.login).length > 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    fetchUserList()
  }, []);
  
  const fetchUserList = async() => {
    try {
      setLoading(true);
      const APIDataStorage = await fetch("https://api.github.com/users/" + login);
      const changeToJSObject = await APIDataStorage.json();
      setData(changeToJSObject);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
      <Text style={[styles.textColor, styles.h5]}>Details:</Text>
      <View style={[styles.shadowProp, styles.view0]}>
        <Image style={styles.image} source={{uri: data?.avatar_url}} />
        <View style={styles.view0_text}>
          <Text style={[styles.textColor, styles.dataText]}>Followers: {data?.followers}</Text>
          <Text style={[styles.textColor, styles.dataText]}>Following: {data?.following}</Text>
          <Text style={[styles.textColor, styles.dataText]}>Public Repositories: {data?.public_repos}</Text>
          <Text style={[styles.textColor, styles.dataText]}>Public Gists: {data?.public_gists}</Text>
        </View>
      </View>
      
      <View style={[styles.shadowProp, styles.view1]}>
        <Text style={[styles.textColor, styles.dataText, styles.textBold]}>{data?.login}</Text>
        <Text style={[styles.textColor, styles.dataText]}>{data?.html_url}</Text>
        <Text style={[styles.textColor, styles.dataText]}>"{data?.bio}"</Text>
      </View>

      <View style={[styles.shadowProp, styles.view2]}>
        <Text style={[styles.textColor, styles.dataText]}>Name: {data?.name}</Text>
        <Text style={[styles.textColor, styles.dataText]}>Company: {data?.company}</Text>
        <Text style={[styles.textColor, styles.dataText]}>Personal Blog: {data?.blog}</Text>
        <Text style={[styles.textColor, styles.dataText]}>Email: {data?.email}</Text>
        <Text style={[styles.textColor, styles.dataText]}>Twitter Username: {data?.twitter_username}</Text>
      </View>

      <TouchableOpacity style={[styles.favoriteButton, styles.shadowProp]} onPress={() => Alert.alert("User added to Favorites!")}>
        <View style={styles.addToFav}>
          <Image source={require('../../images/star_black.png')} style={styles.headerButtonImage}/>
          <Text style={[styles.dataText, styles.textBold, styles.textColor]}> Add to Favorites</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    padding: 5,
    backgroundColor: "#f5c78d",
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

  shadowProp: {
    elevation: 6,
  },

  view0: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#FFF3E4"
  },

  view0_text: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#FBFBFB",
    marginLeft: 20
  },

  image: {
    height: 150,
    width: 150,
    margin: 3,
  },

  dataText: {
    fontSize: 16
  },

  view1: {
    alignItems: "center",
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#FFF3E4",
    padding: 5,
  },

  textBold: {
    fontWeight: "bold",
  },

  view2: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#FFF3E4"
  },

  addToFav: {
    display: "flex",
    flexDirection: "row",
  },

  headerButtonImage: {
    height: 25,
    width: 25,
  },

  favoriteButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: "auto",
    backgroundColor: "#f0a45d",
    position: "absolute",
    marginTop: 670,
    marginLeft: 230,
  },
});
