import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

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
            <View>
                <Text>Crear Post</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    value={this.state.input}
                    onChangeText={(texto) => this.setState({ input: texto, error: false })}
                    placeholder='¿Qué estás pensando?'
                />

                <TouchableOpacity onPress={() => this.CrearPosteo()}>
                    <Text>Postear</Text>
                </TouchableOpacity>

                {this.state.error && <Text>No has escrito nada aún 🥲</Text>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: 'red',
        padding: 10,
        margin: 10
    }
})
