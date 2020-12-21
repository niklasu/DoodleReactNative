import React, {useEffect, useState} from 'react';
import CheckboxList from 'rn-checkbox-list';
import {serverIp} from './App';
import {Button, TextInput} from 'react-native';
export function CreateAppointment({navigator, route}) {
  const [users, setUsers] = useState([]);
  const [textFieldValue, onChangeText] = React.useState('');
  let invitees = [];
  useEffect(() => {
    const fetchData = () => {
      fetch(`http://${serverIp}:3000/api/users`)
        .then((r) => r.json())
        .then(setUsers);
    };

    fetchData();
  }, []);

  function createAppointment() {
    fetch(`http://${serverIp}:3000/api/appointments`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: textFieldValue,
        participants: invitees,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <TextInput
        placeholder={'Why wanna meet?'}
        style={{
          marginHorizontal: 10,
          marginTop: 10,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onChangeText={(text) => onChangeText(text)}
        value={textFieldValue}
      />
      <CheckboxList
        listItems={users}
        onChange={({ids, items}) => {
          invitees = ids;
          console.log('My updated list :: ', ids);
          console.log(invitees);
        }}
      />
      <Button title={'Leute einladen'} onPress={createAppointment} />
    </>
  );
}
