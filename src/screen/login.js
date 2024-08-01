import { Image, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [initializing, setInitializing] = useState(true);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleNav = () => {
        navigation.navigate('Signup');
    };

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            if (user) {
                setInitializing(true);
                navigation.navigate('BottomAppBar');
            } else {
                setInitializing(false);
            }
        });

        return () => unsubscribe();
    }, [navigation]);

    const validateEmail = (inputEmail) => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!inputEmail) {
            setEmailError("Email không được bỏ trống");
            return false;
        } else if (!emailRegex.test(inputEmail)) {
            setEmailError("Email không hợp lệ");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    }

    const validatePassword = (inputPassword) => {
        if (!inputPassword) {
            setPasswordError("Mật khẩu không được bỏ trống");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    }

    const handleLogin = () => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Đã đăng nhập!');
                setEmail('');
                setPassword('');
                navigation.navigate('BottomAppBar');
            })
            .catch(error => {
                console.log('Login error:', error);
                if (error.code === 'auth/user-not-found') {
                    setEmailError("Tài khoản không tồn tại");
                }
                if (error.code === 'auth/invalid-email') {
                    setEmailError("Email không hợp lệ!");
                }
                if (error.code === 'auth/wrong-password') {
                    setPasswordError("Sai mật khẩu!");
                }
                if (error.code === 'auth/too-many-requests') {
                    setPasswordError("Quá nhiều lần thử. Vui lòng thử lại sau.");
                }

                console.log(error);
            });
    }

    GoogleSignin.configure({
        webClientId: '600855251153-mtlorj5j0rtvuc7mc66mus8ds6n7kegq.apps.googleusercontent.com',
    });

    async function onGoogleButtonPress() {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth()
            .signInWithCredential(googleCredential)
            .then(() => {
                console.log('Đã đăng nhập bằng Google!');
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [{ name: 'BottomAppBar' }],
                    })
                );
            });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <ImageBackground style={styles.bground} source={require('../image/imgbackground.jpg')} resizeMode='stretch'>
                    <Image style={styles.img} resizeMode='contain' source={require('../image/logo.png')} />
                    <TextInput
                        style={[styles.tinput, emailError ? styles.errorInput : null]}
                        placeholder='Email'
                        onChangeText={(text) => {
                            setEmail(text);
                            if (emailError) setEmailError("");
                        }}
                        value={email}
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    <View style={[styles.passwordContainer, passwordError ? styles.errorInput : null]}>
                        <TextInput
                            style={styles.tinputPassword}
                            placeholder='Mật khẩu'
                            onChangeText={(text) => {
                                setPassword(text);
                                if (passwordError) setPasswordError("");
                            }}
                            value={password}
                            secureTextEntry={secureTextEntry}
                        />
                        <TouchableOpacity style={{ position: 'relative', right: 15 }} onPress={() => setSecureTextEntry(!secureTextEntry)}>
                            <Ionicons
                                name={secureTextEntry ? "eye-off" : "eye"}
                                size={20}
                                color="grey"
                            />
                        </TouchableOpacity>
                    </View>
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
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
    tinputPassword: {
        backgroundColor: '#ffffff',
        flex: 1,
        borderRadius: 30,
        padding: 10,
        marginRight: 10
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
        marginTop: 10,
        padding: 1,
        backgroundColor: '#ffffff',
        borderRadius: 30
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
    },
    errorInput: {
        borderColor: 'red',
        borderWidth: 1,
    },
    errorText: {
        color: 'red',
        marginHorizontal: 25,
        marginTop: 5,
    }
});
