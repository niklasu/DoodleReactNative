// In App.js in a new project

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {InviteScreen} from './InviteScreen';
import {LoginScreen} from './LoginScreen';
import {ProfileScreen} from './ProfileScreen';

export const serverIp = '10.0.2.2';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Invite"
          component={InviteScreen}
          options={{title: 'Invites'}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{title: 'My Profile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
