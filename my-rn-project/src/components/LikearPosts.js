import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'




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
                <Text>{this.props.data.owner}</Text>
                <Text>likes:{this.state.cantLikes}</Text>
                {
                    this.state.likes ?
                        <TouchableOpacity
                            onPress={() => this.Dislikear()}




                        >
                            <Text>
                                Dislikear
                            </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => this.LikearUsuario()}




                        >
                            <Text>
                                Like
                            </Text>
                        </TouchableOpacity>
                }
















            </View>
        )
    }




}
const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    }




})




