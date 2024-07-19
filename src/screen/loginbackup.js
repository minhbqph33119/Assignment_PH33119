import { Image, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';



const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    const handleNav = () => {
        navigation.navigate('Signup');
    };

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                setInitializing(true);
                navigation.navigate('Home');
            } else {
                setInitializing(false)
            }
        })

    }, []);

    const handleLogin = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Đã đăng nhập!');
                navigation.navigate('Home');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('Email đã được sử dụng!');
                }
                if (error.code === 'auth/invalid-email') {
                    console.log('Email không hợp lệ!');
                }

                console.log(error);
            })
    }


    GoogleSignin.configure({
        webClientId: '600855251153-mtlorj5j0rtvuc7mc66mus8ds6n7kegq.apps.googleusercontent.com',
    });

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth()
            .signInWithCredential(googleCredential)
            .then(() => {
                console.log('Đã đăng nhập bằng Google!');
                navigation.navigate('Home');
            });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ImageBackground style={styles.bground} source={require('../image/imgbackground.jpg')} resizeMode='stretch'>
                <Image style={styles.img} resizeMode='contain' source={require('../image/logo.png')} />
                <TextInput style={styles.tinput} placeholder='Email' onChangeText={setEmail} value={email} />
                <TextInput style={styles.tinput} placeholder='Mật khẩu' onChangeText={setPassword} value={password} secureTextEntry={true} />
                <View>
                    <TouchableOpacity>
                        <Text style={{ position: 'absolute', right: 10, padding: 15 }}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogin} style={styles.btn}>
                        <View style={styles.custombtn}>
                            <Text style={styles.txt}>ĐĂNG NHẬP</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <View style={styles.line} />
                    <Text style={{ justifyContent: 'center', color: '#ffffff' }}>Hoặc</Text>
                    <View style={styles.line} />
                </View>
                <TouchableOpacity onPress={onGoogleButtonPress} style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="google" size={30} />
                    <Text style={{ marginLeft: 5, fontSize: 15 }}>Đăng nhập bằng Google</Text>
                </TouchableOpacity>
                <View style={{ width: '100%', position: 'relative', top: 130 }}>
                    <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#FFFFFF' }} />
                    <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15 }}>Bạn chưa có tài khoản ?</Text>
                        <TouchableOpacity onPress={handleNav}>
                            <Text style={{ color: '#FFFFFF', marginLeft: 5, fontWeight: 'bold', fontSize: 15 }}>Đăng Ký</Text>
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
