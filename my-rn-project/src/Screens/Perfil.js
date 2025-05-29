import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class Perfil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: null,
      posts: []
    }
  }

  componentDidMount() {
    const currentUser = auth.currentUser;
    console.log("Email del usuario actual:", currentUser.email);

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

      db.collection('posts')
        .where('owner', '==', currentUser.email)
        // .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          const userPosts = snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()

          }));
          console.log("Posteos encontrados en Perfil:", userPosts);
          this.setState({ posts: userPosts });
        });
    }
  }
  
  deletePost(postId) {
    db.collection('posts').doc(postId).delete()
      .then(() => {
        console.log('Post eliminado:', postId);
        this.setState({
          posts: this.state.posts.filter(post => post.id !== postId)
        });
      })
      .catch(error => {
        console.log('Error eliminando el post:', error);
      });
  }


  logout() {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(err => console.log('Error en signOut', err))
  }


  render() {
    const { userData, posts } = this.state;
    const currentUser = auth.currentUser;


    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>


        {userData && currentUser ? (
          <View style={styles.infoBox}>
            <Text style={styles.text}>Nombre de usuario: {userData.username}</Text>
            <Text style={styles.text}>Email: {currentUser.email}</Text>
            <Text style={styles.title}>Mis Posteos</Text>
            {posts.length > 0 ? (
              <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.post}>
                    <Text>{item.data.text}</Text>
                    <TouchableOpacity 
                      style={styles.deleteButton} 
                      onPress={() => this.deletePost(item.id)}
                    >
                      <Text style={styles.deleteButtonText}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            ) : (
              <Text>No tienes posteos aún.</Text>
            )}
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
