import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'

const Home = ({ navigation }) => {
    return (
        <View>
            <Text
                onPress={() => auth().signOut().then(() => {
                    console.log('Sign out!');
                    navigation.navigate('Login')
                })}>signout</Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})