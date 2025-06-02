import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import { MaterialCommunityIcons , Ionicons } from "@expo/vector-icons"

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input1: '',
            input2: '',
            input3: '',
            error: false
        }
    }

    registrarUsuario(email, password, username) {
        if (
            (email !== '' && password !== '' && username !== '')
            &&
            (email.includes('@'))
            &&
            password.length > 5
            &&
            username.length > 3
        ) {
            auth
                .createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    db.collection('users').add({
                        owner: email,
                        createdAt: Date.now(),
                        updatedAt: Date.now(),
                        username: this.state.input3
                    })
                        .then(() => {
                            auth
                                .signOut()
                                .then(() => {
                                    this.props.navigation.navigate('Login');
                                })
                                .catch((err) => console.log('SignOut error:', err));
                        })
                        .catch((err) => console.log(err))

                })
                .catch((err) => console.log('firebase err', err))
        } else {
            this.setState({ input1: '', input2: '', input3: '', error: true })
        }
    }

    irAlLogin() {
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>
                <TextInput
                    style={
                        styles.input
                    }
                    keyboardType='default'
                    value={this.state.input1}
                    onChangeText={(texto) => this.setState({ input1: texto, error: false })}
                    placeholder='Ingresa tu email'
                />
                <TextInput
                    style={
                        styles.input
                    }
                    keyboardType='default'
                    value={this.state.input2}
                    onChangeText={(texto) => this.setState({ input2: texto, error: false })}
                    placeholder='Ingresa tu contraseña'
                    secureTextEntry={true}
                />
                <TextInput
                    style={
                        styles.input
                    }
                    keyboardType='default'
                    value={this.state.input3}
                    onChangeText={(texto) => this.setState({ input3: texto, error: false })}
                    placeholder='Ingresa tu nombre de usuario'
                />
                <TouchableOpacity style={styles.btn} onPress={() => this.registrarUsuario(this.state.input1, this.state.input2, this.state.input3)}>
                    <Text style={styles.btnTxt}>Registrarme</Text>
                </TouchableOpacity>
                {
                    this.state.error ? <Text style={styles.errorText}><MaterialCommunityIcons name="alert-circle" size={24} color="#8b939c" /> {"   "} Debes completar todos los campos </Text> : null
                }
                <TouchableOpacity onPress={() => this.irAlLogin()}>
                    <Text style={styles.registerLink}>¿Ya tenes cuenta? Inicia sesión.<Ionicons name="enter-sharp" size={24} color="#3897f0" />
                    </Text>
                </TouchableOpacity>
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
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#222',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    btn: {
        width: '100%',
        height: 50,
        backgroundColor: '#3897f0',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    btnTxt: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerLink: {
        marginTop: 20,
        color: '#3897f0',
        fontSize: 14,
    },
    errorText: {
        color: '#8b939c',
        marginTop: 10,
        textAlign: 'center',
    },
});
