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

  return (
    <>
      <FlatList
        data={appointments}
        renderItem={({item}) => (
          <Text style={{margin: 10, fontSize: 30}}>{item.name}</Text>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
