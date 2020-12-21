import {FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {serverIp} from './App';

export function InviteScreen({route}) {
  const {userId} = route.params;
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://${serverIp}:3000/api/users/${userId}/invites`)
        .then((r) => r.json())
        .then(setAppointments);
    };

    fetchData();
  }, [userId]);

  function getText(item) {
    return <Text style={{margin: 10, fontSize: 30}}>{item.name}</Text>;
  }

  return (
    <>
      <FlatList
        data={appointments}
        renderItem={({item}) => getText(item)}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
