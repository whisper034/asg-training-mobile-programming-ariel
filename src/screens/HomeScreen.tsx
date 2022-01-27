import { ActivityIndicator, View, Text, TouchableOpacity, ListRenderItemInfo, FlatList, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IUserListItem } from '../interfaces';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

  const [data, setData] = useState<IUserListItem[]>([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserList()
  }, []);
  
  const fetchUserList = async() => {
    try {
      setLoading(true);
      const APIDataStorage = await fetch("https://api.github.com/users");
      const changeToJSObject = await APIDataStorage.json();
      setData(changeToJSObject);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  }

  const navigateToDetailScreen = (item: string) => {
    navigation.navigate("DetailScreen", {
      item: item
    })
  }

  const renderUserItem = (renderItemInfo: ListRenderItemInfo<IUserListItem>) => {
    const { item } = renderItemInfo;
    return (
      <TouchableOpacity onPress={() => navigateToDetailScreen(item.login)}>
        <View style={[styles.item, styles.shadowProp]}>
          <Image style={[styles.image]} source={{uri: item.avatar_url}} />
          <View style={styles.view0_text}>
            <Text style={[styles.dataText, styles.textColor]}>{item.login}</Text>
            <Text style={[styles.textColor]}>{item.type}</Text>
            <Text style={[styles.textColor]}>{item.html_url}</Text>
          </View>
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
      <Text style={[styles.textColor, styles.h5]}>Github User List:</Text>
      <FlatList data={data} renderItem={renderUserItem} />
    </View>
  );
};

export default HomeScreen;

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

  image: {
    height: 90,
    width: 90,
    borderRadius: 100,
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
