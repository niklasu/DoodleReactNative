import {
  FlatList,
  Modal,
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {serverIp} from './App';
import {ListItem} from 'react-native-elements';
import {Alert} from 'react-native';
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

  const [selectedAppointment, setSelectedAppointment] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  function getStateText(item) {
    switch (item.state) {
      case 0:
        return 'Pending';
      case 1:
        return 'Called Off';
      case 2:
        return 'Confirmed';
    }
    return item.state;
  }

  function submit(answerEnum) {
    let nummer = 0;
    if (answerEnum === 'ACCEPTED') {
      nummer = 0;
    }
    if (answerEnum === 'REJECTED') {
      nummer = 1;
    }
    fetch(
      `http://${serverIp}:3000/api/appointments/${selectedAppointment}/answers`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participantId: userId,
          answer: nummer,
        }),
      },
    )
      .then((response) => response.json())
      .then((r) => console.log(r))
      .catch((error) => console.log(error));
  }

  return (
    <>
      <FlatList
        data={appointments}
        renderItem={({item}) => (
          <ListItem
            key={item.id}
            bottomDivider
            onPress={() => {
              setSelectedAppointment(item.id);
              setModalVisible(true);
            }}>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{getStateText(item)}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>What's your answer?</Text>

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#4DBC15'}}
              onPress={() => {
                submit('ACCEPTED');
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Accept</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: '#BC5E15',
                marginTop: 20,
              }}
              onPress={() => {
                submit('REJECTED');
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Decline</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
