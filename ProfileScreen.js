import {Button, Modal, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {serverIp} from './App';

export function ProfileScreen({navigation, route}) {
  const {userId} = route.params;
  const [user, setUser] = useState({id: 0, name: 'Loading...'});

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://${serverIp}:3000/api/users/${userId}`)
        .then((r) => r.json())
        .then(setUser);
    };

    fetchData();
  }, [userId]);
  return (
    <>
      <Text style={{fontSize: 40, marginBottom: 20}}>Hallo, {user.name}</Text>
      <Text style={{fontSize: 20, marginBottom: 20}}>Id: {user.id}</Text>
      <Button
        title={'Invitations'}
        onPress={() => navigation.navigate('Invite', {userId: userId})}
      />
      <View style={{margin: 10}} />
      <Button
        title={'Create appointment'}
        onPress={() =>
          navigation.navigate('CreateAppointment', {userId: userId})
        }
      />
    </>
  );
}
