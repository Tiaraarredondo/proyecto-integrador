
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'


export default class Perfil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: null,
    }
  }


  componentDidMount() {
    const currentUser = auth.currentUser;


    if (currentUser) {
      db.collection('users')
        .where('owner', '==', currentUser.email)
        .onSnapshot(docs => {
          docs.forEach(doc => {
            this.setState({
              userData: doc.data()
            });
          });
        });
    }
  }


  logout() {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Login')) // asegúrate que esta pantalla exista
      .catch(err => console.log('Error en signOut', err))
  }


  render() {
    const { userData } = this.state;
    const currentUser = auth.currentUser;


    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>


        {userData && currentUser ? (
          <View style={styles.infoBox}>
            <Text style={styles.text}>Nombre de usuario: {userData.username}</Text>
            <Text style={styles.text}>Email: {currentUser.email}</Text>
          </View>
        ) : (
          null
        )}


        <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  infoBox: {
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    marginBottom: 5
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  }
});
