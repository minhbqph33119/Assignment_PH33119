import { Image, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = () => {
        navigation.navigate('Signup');
    };

    useEffect(() => {

    }, []);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ImageBackground style={styles.bground} source={require('../image/imgbackground.jpg')} resizeMode='stretch'>
                <Image style={styles.img} resizeMode='contain' source={require('../image/logo.png')} />
                <TextInput style={styles.tinput} placeholder='Email' onChangeText={setEmail} value={email} />
                <TextInput style={styles.tinput} placeholder='Password' onChangeText={setPassword} value={password} secureTextEntry={true} />
                <View>
                    <TouchableOpacity>
                        <Text style={{ position: 'absolute', right: 10, padding: 15 }}>Forgot password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <View style={styles.custombtn}>
                            <Text style={styles.txt}>LOG IN</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <View style={styles.line} />
                    <Text style={{ justifyContent: 'center', color: '#ffffff' }}>Or</Text>
                    <View style={styles.line} />
                </View>
                <TouchableOpacity style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="google" size={30} />
                    <Text style={{ marginLeft: 5, fontSize: 15 }}>Sign in with Google</Text>
                </TouchableOpacity>
                <View style={{ width: '100%', position: 'relative', top: 130 }}>
                    <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#FFFFFF' }} />
                    <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15 }}>Don't have an account yet ?</Text>
                        <TouchableOpacity onPress={handleSignup}>
                            <Text style={{ color: '#FFFFFF', marginLeft: 5, fontWeight: 'bold', fontSize: 15 }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

export default Login;

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
        width: '35%',
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF'
    }
});
