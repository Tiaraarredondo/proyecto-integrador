import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            error : false,
        }
    }
//ESTO ES LO DE REMEMBERME
    componentDidMount(){
            auth.onAuthStateChanged((user) =>{
                if(user){
                    console.log('user en Register', user)
                    this.props.navigation.navigate('Tab')
                }
            })
        }


    irAlRegistro(){
        this.props.navigation.navigate('Register')
    }


    loguearUsuario(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then((user)=> this.props.navigation.navigate('Tab'))
        .catch((err)=> this.setState({email : '', password : '', error : true}))
    }


    render() {
        return (
        <View>
            <Text>Login</Text>
            <TextInput
                keyboardType='email'
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text, error: false })}
                style={styles.input}
                placeholder='Ingresa tu mail'
            />
            <TextInput
                keyboardType='default'
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text, error: false })}
                style={styles.input}
                secureTextEntry={true}
                placeholder='Ingresa tu contraseña'
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={()=> this.loguearUsuario(this.state.email, this.state.password)}
            >
                <Text style={styles.btnTxt}>Ingresa</Text>
            </TouchableOpacity>
            {
                            this.state.error ? <Text>Credenciales invalidas</Text> : null
                        }


            <TouchableOpacity onPress={()=> this.irAlRegistro()}>
                            <Text>Ir al Register</Text>
                        </TouchableOpacity>


        </View>
        )
    }
}


const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor:'green',
        marginBottom: 8
    },
    btn:{
        backgroundColor: 'blue'
    },
    btnTxt:{
        color:'white'
    }
})
