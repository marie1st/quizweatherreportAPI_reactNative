import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, BackHandler, Table } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataTable } from 'react-native-paper';

const Stack = createStackNavigator();

const App = () => {
  const [Parameters, SetParameters] = useState([]);
  const HeadTable = ['Date', 'Place', 'Temperature'];
  

function fetchData() {
  fetch("https://community-open-weather-map.p.rapidapi.com/onecall/timemachine?lat=37.774929&lon=-122.419418&dt=1590094153%20", {
	method: "GET",
	headers: {
		"x-rapidapi-key": "3ad588fb2amshc7e49add7f55290p199e83jsn1e79cb8e82d1",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
})
.then(response => {
  SetParameters(response);
	console.log(response);
})
.catch(err => {
	console.error(err);
});

    
}
useEffect(() => {
  fetchData();
}, [])
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="City" component={CityScreen} />
      </Stack.Navigator>
    
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <div>
    <Button
      title="Menu"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Marie' })
      }

      style={{
        position: 'absolute',
        right: 5,
        top: 5,
  }}
    />
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>City</DataTable.Title>
        <DataTable.Title>Date</DataTable.Title>
        <DataTable.Title>Temperature</DataTable.Title>
      </DataTable.Header>
      {Parameters.map((item,index) =>(
      <DataTable.Row onPress={() => navigation.navigate('City', {name: `${item.city.name}`})}>
        <DataTable.Cell>{item.city.name}</DataTable.Cell>
        <DataTable.Cell>{item.list[0].dt}</DataTable.Cell>
        <DataTable.Cell>{item.list[0].temp.max}</DataTable.Cell>
      </DataTable.Row>
      ))}
    </DataTable>
    </div>
  );
};
const ProfileScreen = ({ navigation, route }) => {
  return <Button title="Exit" onPress={() => BackHandler.exitApp() } />;
};

const CityScreen = ({ navigation, route }) => {
  return <DataTable>
    <DataTable.Header>
      <DataTable.Title>City</DataTable.Title>
      <DataTable.Title>Date</DataTable.Title>
      <DataTable.Title>Temperature</DataTable.Title>
    </DataTable.Header>
    {Parameters.map((item,index) =>(
      <DataTable.Row>
        <DataTable.Cell>{item.city.name}</DataTable.Cell>
        <DataTable.Cell>{item.list[index].dt}</DataTable.Cell>
        <DataTable.Cell>{item.list[index].temp.max}</DataTable.Cell>
      </DataTable.Row>
    ))}
  </DataTable>
};

export default App;