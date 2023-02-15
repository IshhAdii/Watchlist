import { StyleSheet, Text, View, FlatList, Icon } from 'react-native';
import React, { useState, useEffect } from 'react';

const HookEffect = () => {
  const [myUserDataState, setMyUserDataState] = useState();
  const [isLoadedState, setIsLoadedState] = useState(true);

  const getUserDataFunction = async () => {
    try {
      const responseObject = await fetch(
        "https://api.ewwadii.com/api/watchlist"
      );
      const myDataObject = await responseObject.json();
      setMyUserDataState(myDataObject);
      setIsLoadedState(false);
      console.log(myDataObject);
    } catch (errorObject) {
      console.log(errorObject);
    }
  }

  useEffect(() => {
    getUserDataFunction();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={stylesObject.items}>
        <Text style={stylesObject.itemObject}>Anime - {item.title}</Text>
        <Text style={stylesObject.itemObject}>malid - {item.malid}</Text>
        <Text style={stylesObject.itemObject}>Status - {item.status}</Text>
        <Text style={stylesObject.itemObject}>Ep Watched - {item.ep}</Text>
        <Text style={stylesObject.itemObject}>Last Watched - {item.last}</Text>
      </View>
    )
  }

  return (
    <View style={stylesObject.container}>
      {myUserDataState && (
        <FlatList
          data={myUserDataState}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <Text style={stylesObject.title}>My Anime Watchlist From AnimixPlay.to</Text>
          )}
        />
      )}
    </View>
  )
}

const stylesObject = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E9EA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#000',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 50,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },

  items: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 0,
    paddingRight: 0,
    marginVertical1: 10,
    marginHorizontal: 16,
    flex: 1,
    borderRadius: 5,
    display: 'flex',
  },

  itemObject: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    padding: 1,
  },
});

export default HookEffect
