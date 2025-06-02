// Perfil.js
import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Posts';

export default class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      posts: []
    };
  }

  componentDidMount() {
    const currentUser = auth.currentUser;

    if (currentUser) {
      db.collection('users')
        .where('owner', '==', currentUser.email)
        .onSnapshot(docs => {
          docs.forEach(doc => {
            this.setState({ userData: doc.data() });
          });
        });



      db.collection('posts')
        .where('owner', '==', currentUser.email)
        .orderBy('createdAt', 'desc')
        .onSnapshot(docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          });
        });
        posts.sort((a,b)=> b.data.cratedAt - a.data.createdAt)
          this.setState({ posts: posts });
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
      .catch(err => console.log('Error en signOut', err));
  }

  render() {
    const { userData, posts } = this.state;
    const currentUser = auth.currentUser;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil 👤</Text>

        {userData && currentUser ? (
          <View style={styles.container}>
            <Text style={styles.text}>Nombre de usuario: {userData.username}</Text>
            <Text style={styles.text}>Email: {currentUser.email}</Text>
            <Text style={styles.title}>Mis Posteos</Text>
            {posts.length > 0 ? (
              <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Post data={item.data} id={item.id} onDelete={(id) => this.deletePost(id)} />
                )}
              />
            ) : (
              <Text>No tienes posteos aún.</Text>
            )}
          </View>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fefefe'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#009688',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 30
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

