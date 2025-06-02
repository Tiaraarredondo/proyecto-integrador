import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'
import { Ionicons } from '@expo/vector-icons'




export default class LikearPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: false,
            cantLikes: this.props.data.likes ? this.props.data.likes.length : 0
        }
    }




    LikearUsuario() {
        db
            .collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => this.setState({
                likes: true,
                cantLikes: this.state.cantLikes +1
            })
            )
    }
    Dislikear() {
        db
            .collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
               
            })
            .then(()=> this.setState({
                likes:false,
                cantLikes: this.state.cantLikes -1
            }))
           
    }








    componentDidMount(){
        if(this.props.data.likes){
            const cantLikes =this.props.data.likes.length
            const likes =this.props.data.likes.includes(auth.currentUser.email)
       
            this.setState({
                cantLikes:cantLikes,
                likes:likes
            })}




    }




    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.likeCount}>{this.state.cantLikes} likes</Text>
                {
                    this.state.likes ?
                        <TouchableOpacity style={styles.button}
                            onPress={() => this.Dislikear()}




                        >
                            <Text>
                                <Ionicons name="heart" size={24} color="#FF0035" /> 
                            </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button}
                            onPress={() => this.LikearUsuario()}




                        >
                            <Text>
                                <Ionicons name="heart" size={24} color="#8B939C" /> 
                            </Text>
                        </TouchableOpacity>
                }
















            </View>
        )
    }




}
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    likeCount: {
        fontSize: 14,
        color: '#555'
    },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
    }
});




