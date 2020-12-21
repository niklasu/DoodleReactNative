import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-community/picker';
import {Button, TextInput, View} from 'react-native';
import {serverIp} from './App';

export function LoginScreen({navigation}) {
  const [users, setUsers] = useState([]);
  const [selectedValue, setSelectedValue] = useState(undefined);
  useEffect(() => {
    const fetchData = () => {
      fetch(`http://${serverIp}:3000/api/users`)
        .then((r) => r.json())
        .then((c) => setUsers(c));
    };

    fetchData();
  }, []);

  const [textFieldValue, onChangeText] = React.useState('');
  return (
    <>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}>
        {users.map((i) => (
          <Picker.Item key={i.id} label={i.name} value={i.id} />
        ))}
      </Picker>
      <Button
        title="login"
        onPress={() => {
          navigation.navigate('Profile', {userId: selectedValue});
        }}
      />

      <TextInput
        style={{
          marginHorizontal: 10,
          marginTop: 30,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onChangeText={(text) => onChangeText(text)}
        value={textFieldValue}
      />
      <View style={{margin: 10}} />
      <Button
        title="Add User"
        onPress={() => {
          fetch(`http://${serverIp}:3000/api/users`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: textFieldValue,
            }),
          })
            .then((response) => response.json())
            .then((json) => {
              setUsers([...users, json]);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      />
    </>
  );
}
