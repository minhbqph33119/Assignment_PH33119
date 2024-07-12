import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleBack = () => {
        navigation.goBack();
    }


    return (
        <View style={styles.container}>
            <ImageBackground style={styles.bground} source={require('../image/imgbackground.jpg')} resizeMode='stretch'>
                <TouchableOpacity onPress={handleBack} style={{ position: 'absolute', top: 20, left: 10 }}>
                    <AntDesign name='left' size={30} color='#ffffff' />
                </TouchableOpacity>
                <Image style={styles.img} resizeMode='contain' source={require('../image//logo.png')} />
                <TextInput style={styles.tinput} placeholder='Email' onChangeText={setEmail} value={email} />
                <TextInput style={styles.tinput} placeholder='Password' onChangeText={setPassword} value={password} secureTextEntry={true} />
                <TextInput style={styles.tinput} placeholder='Confirm Password' onChangeText={setConfirmPassword} value={confirmPassword} secureTextEntry={true} />
                <View>
                    <TouchableOpacity style={styles.btn}>
                        <View style={styles.custombtn}>
                            <Text style={styles.txt}>SIGN UP</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', position: 'relative', top: 150 }}>
                    <View style={styles.line} />
                    <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15 }}>If you already have an account</Text>
                        <TouchableOpacity onPress={handleBack}>
                            <Text style={{ color: '#FFFFFF', marginLeft: 5, fontWeight: 'bold', fontSize: 15 }}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: '100%',
        height: 150
    },
    bground: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    tinput: {
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 30,
        width: '90%',
        marginTop: 10,
        padding: 10
    },
    btn: {
        marginTop: 50,
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#C2FFF3',
        padding: 10,
        borderRadius: 30
    },
    txt: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    custombtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    line: {
        alignSelf: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF'
    }
})