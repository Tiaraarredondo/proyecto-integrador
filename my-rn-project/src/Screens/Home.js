import {Text,View,FlatList,StyleSheet,ActivityIndicator} from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'
import LikearPost from '../components/LikearPosts'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            loading: true
        }
    }

    componentDidMount() {
        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot((docs) => {
                let posts = []
                docs.forEach((doc) => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({ posts, loading:false })
            })
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="blue" />
                    <Text style={styles.loadingText}>Cargando posteos...</Text>
                </View>
            );
        }
        return (
            <View style={styles.main}>
                <Text style={styles.title}>Posteos</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.post}>
                            <Text style={styles.owner}>👤 {item.data.owner}</Text>
                            <Text style={styles.postText}>{item.data.text}</Text>
                            <LikearPost data={item.data} id={item.id} />
                        </View>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 15,
        textAlign: 'center',
    },
    post: {
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    owner: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        fontSize: 14,
    },
    postText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    }
});