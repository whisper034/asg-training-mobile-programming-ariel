import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { IUserDetailItem } from '../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorites, saveFavorites } from '../store/AuthReducer/AuthReducer';
import { RootState } from '../store';

const DetailScreen = () => {

  const initialState = {
    login: "",
    id: -1,
    node_id: "",
    avatar_url: "dummyUrl",
    gravatar_id: "",
    url: "",
    html_url: "",
    followers_url: "",
    following_url: "",
    gists_url: "",
    starred_url: "",
    subscriptions_url: "",
    organizations_url: "",
    repos_url: "",
    events_url: "",
    received_events_url: "",
    type: "",
    site_admin: false,
    name: "",
    company: "",
    blog: "",
    location: "",
    email: "",
    hireable: "",
    bio: "",
    twitter_username: "",
    public_repos: -1,
    public_gists: -1,
    followers: -1,
    following: -1,
    created_at: "",
    updated_at: "",
    isFavorite: false,
  }

  const route = useRoute<RouteProp<RootStackParamList, "DetailScreen">>();
  const login = route.params.item;
  const [data, setData] = useState<IUserDetailItem>(initialState);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const isFavorite = (login: string): boolean => {
    let temp = false;
      auth.item.forEach((user) => {
        if(user.login === login) {
          temp = true;
          return;
        }
      })
    return temp;
  }

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
      <View style={[styles.shadowProp, styles.view1]}>
        <Text style={[styles.textColor, styles.dataText, styles.textBold]}>{data?.login}</Text>
        <Text style={[styles.textColor, styles.dataText]}>{data?.type}</Text>
      </View>

      <View style={[styles.shadowProp, styles.view0]}>
        <Image style={styles.image} source={{uri: data?.avatar_url}} />
        <View style={styles.view0_1}>
          <View style={styles.follow1}>
            <Text style={[styles.textColor, styles.dataText]}>{data?.followers}</Text>
            <Text style={[styles.textColor, styles.dataText]}>Followers</Text>
          </View>
          <View style={styles.follow1}>
            <Text style={[styles.textColor, styles.dataText]}>{data?.following}</Text>
            <Text style={[styles.textColor, styles.dataText]}>Following</Text>
          </View>
        </View>
      </View>
      
      <View style={[styles.public, styles.shadowProp]}>
        <View style={styles.public1}>
          <Text style={[styles.textColor, styles.dataText]}>{data?.public_repos}</Text>
          <Text style={[styles.textColor, styles.dataText]}>Public Repositories</Text>
        </View>
        <View style={styles.public1}>
          <Text style={[styles.textColor, styles.dataText]}>{data?.public_gists}</Text>
          <Text style={[styles.textColor, styles.dataText]}>Public Gists</Text>
        </View>
      </View>
      
      <View style={[styles.view2, styles.shadowProp]}>
      <Text style={[styles.textColor, styles.dataText]}>Bio:</Text>
        <Text style={[styles.textColor, styles.dataText]}>"{data?.bio}"</Text>
      </View>

      <View style={[styles.shadowProp, styles.view2]}>
        <Text style={[styles.textColor, styles.dataText]}>Name: {data?.name}</Text>
        <Text style={[styles.textColor, styles.dataText]}>Email: {data?.email}</Text>
        <Text style={[styles.textColor, styles.dataText]}>Twitter Username: {data?.twitter_username}</Text>
      </View>

      <View style={[styles.shadowProp, styles.moreDetails]}>
      <Text style={[styles.textColor, styles.dataText]}>See even more details for this user:</Text>
      <Text style={[styles.textColor, styles.dataText]}>{data?.html_url}</Text>
      </View>

      {
        !isFavorite(data.login) ? (
          <TouchableOpacity 
            style={[styles.favoriteButton, styles.shadowProp]} 
            onPress={() => {
              dispatch(saveFavorites(data)),
              Alert.alert(
                "Added!", "User added to Favorites!",
                [
                  {
                  }
                ],
                {
                  cancelable: true
                }
              )
            }}
          >
            <View style={styles.addToFav}>
              <Image source={require('../../images/star_black.png')} style={styles.headerButtonImage}/>
              <Text style={[styles.dataText, styles.textBold, styles.textColor]}> Add to Favorites</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.favoriteButton, styles.shadowProp]} 
            onPress={() => {
              dispatch(removeFavorites(data)),
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
            }}
          >
            <View style={styles.addToFav}>
              <Image source={require('../../images/trash_icon.png')} style={styles.headerButtonImage}/>
              <Text style={[styles.dataText, styles.textBold, styles.textColor]}> Remove from Favorites</Text>
            </View>
          </TouchableOpacity>
        )
      }
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

  dataText: {
    fontSize: 16
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
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#FFF3E4"
  },

  view0_1: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#FBFBFB",
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
  },

  follow1: {
    alignItems: "center",
    margin: 14,
  },

  public: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    margin: 5,
    backgroundColor: "#FFF3E4",
    justifyContent: "center",
  },

  public1: {
    alignItems: "center",
    margin: 14,
    marginLeft: 28,
    marginRight: 28,
  },

  image: {
    height: 120,
    width: 120,
    margin: 5,
    borderRadius: 100,
  },

  view1: {
    alignItems: "center",
    margin: 5,
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
    backgroundColor: "#FFF3E4",
    margin: 5
  },

  moreDetails: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#FFF3E4",
    margin: 5,
    alignItems: "center",
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
    alignSelf: "center",
    backgroundColor: "#f0a45d",
    position: "absolute",
    marginTop: 670,
  },
});
