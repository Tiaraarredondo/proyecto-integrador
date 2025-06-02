import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'
import { FontAwesome6 } from "@expo/vector-icons"

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
        if(
            (email !== '' && password !== '' ) 
            &&
            (email.includes('@'))
            &&
            password.length > 5
            
        ){
        auth
        .signInWithEmailAndPassword(email, password)
        .then((user)=> this.props.navigation.navigate('Tab'))
        .catch((err)=> this.setState({email : '', password : '', error : true}))
    }else{
         this.setState({input1:'', input2: '', error: true})
    }
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
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
                            this.state.error ? 
                            <Text style={styles.errorText}>Al parecer algun dato no es correcto <FontAwesome6 name="face-flushed" size={24} color="#8b939c" />. Intentalo de nuevo.</Text> : null
                        }


            <TouchableOpacity onPress={()=> this.irAlRegistro()}>
                            <Text style={styles.registerLink}>Ir al Register</Text>
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