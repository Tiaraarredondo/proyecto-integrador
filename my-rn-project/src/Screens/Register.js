import { 
    Text, 
    View, 
    TextInput, 
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            input1:'',
            input2:'',
            input3:'',
            error: false
        }
    }

    registrarUsuario(email, password, username){
        if(
            (email !== '' && password !== '') 
            &&
            (email.includes('@'))
            &&
            password.length > 5
            &&
            username.length > 3
        ){
            auth
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                db.collection('users').add({
                    owner: email,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    username: this.state.input3
                })
                .then(()=> {
                    auth.signOut()
                    this.props.navigation.navigate('Login')
                })
                .catch((err) => console.log(err))
                
            })
            .catch((err)=> console.log('firebase err', err))
        } else {
            this.setState({input1:'', input2: '', error: true})
        }
    }

    irAlLogin(){
        this.props.navigation.navigate('Login')
    }

  render() {
    return (
      <View>
        <Text>Register</Text>
            <TextInput
                style={
                    styles.input
                }
                keyboardType='default'
                value={this.state.input1}
                onChangeText={(texto) => this.setState({input1: texto, error: false }) }
                placeholder='Ingresa tu email'
            />
            <TextInput
                style={
                    styles.input
                }
                keyboardType='default'
                value={this.state.input2}
                onChangeText={(texto) => this.setState({input2: texto, error: false }) }
                placeholder='Ingresa tu password'
                secureTextEntry={true}
            />
            <TextInput
                style={
                    styles.input
                }
                keyboardType='default'
                value={this.state.input3}
                onChangeText={(texto) => this.setState({input3: texto, error: false }) }
                placeholder='Ingresa tu nombre de usuario'
            />
            <TouchableOpacity onPress={()=> this.registrarUsuario(this.state.input1, this.state.input2, this.state.input3)}>
                <Text>Registrarme</Text>
            </TouchableOpacity>
            {
                this.state.error ? <Text>Credenciales invalidas</Text> : null
            }
            <TouchableOpacity onPress={()=> this.irAlLogin()}>
                <Text>Ir al login</Text>
            </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: 'red'
    }
})
