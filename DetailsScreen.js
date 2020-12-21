import {Text, View} from 'react-native';
import React from 'react';

export function DetailsScreen({route}) {
  const {userId} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen for user with id {userId}</Text>
    </View>
  );
}
