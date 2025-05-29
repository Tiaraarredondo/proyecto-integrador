import {
    Text,
    View,
    FlatList,
    StyleSheet
} from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
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
                this.setState({ posts })
            })
    }

    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.title}>Posteos</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.post}>
                            <Text style={styles.owner}>👤 {item.data.owner}</Text>
                            <Text>{item.data.text}</Text>
                        </View>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        flex : 1,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center'
    },
    post: {
        padding: 15,
        margin: 10,
        backgroundColor: '#eee',
        borderRadius: 10
    },
    owner: {
        fontWeight: 'bold',
        marginBottom: 5
    }
})