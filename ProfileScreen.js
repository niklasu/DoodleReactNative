import {Button, Text} from 'react-native';
import React from 'react';

export function ProfileScreen({navigation, route}) {
  const {userId} = route.params;
  return (
    <>
      <Text>{userId}</Text>
      <Button
        title={'Invites'}
        onPress={() => navigation.navigate('Invite', {userId: userId})}
      />
    </>
  );
}
