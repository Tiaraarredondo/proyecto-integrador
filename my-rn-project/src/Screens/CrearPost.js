import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import { FontAwesome , FontAwesome6 } from "@expo/vector-icons"

export default class CrearPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            error: false
        }
    }

    CrearPosteo() {
        const input = this.state.input;

        if (input !== '') {
            db.collection('posts')
                .add({
                    owner: auth.currentUser.email,
                    text: input,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                })
                .then(() => {
                    this.setState({ input: '', error: false })
                    this.props.navigation.navigate('Home')
                })
                .catch((err) => console.log('Error al postear:', err))
        } else {
            this.setState({ error: true })
        }
    }

    render() {
        return (
            <View style={styles.container}>
    <Text style={styles.title}>Crear Post</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    value={this.state.input}
                    onChangeText={(texto) => this.setState({ input: texto, error: false })}
                    placeholder='¿Qué estás pensando?'
                />

                <TouchableOpacity style={styles.btn} onPress={() => this.CrearPosteo()}>
                    <Text><FontAwesome name="send" size={24} color="#8B939C" /></Text>
                </TouchableOpacity>

                {this.state.error && <Text style={styles.errorText}>No has escrito nada aún {"   "} <FontAwesome6 name="face-flushed" size={24} color="#8B939C" /></Text>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        minHeight: 100,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    btn: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#8B939C',
        fontSize : 16,
        marginTop: 10,
        textAlign: 'center',
    }
});
