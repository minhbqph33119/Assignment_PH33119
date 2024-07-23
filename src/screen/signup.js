import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import auth from '@react-native-firebase/auth'

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState(true);

    const handleBack = () => {
        navigation.goBack();
    }

    const addToJsonServer = (user) => {
        fetch('http://10.0.2.2:3000/userManager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: user.uid,
                email: email,
                password: password
            })
        })
    }

    const validateEmail = async (inputEmail) => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!inputEmail) {
            return "Email không được bỏ trống";
        } else if (!emailRegex.test(inputEmail)) {
            return "Email không hợp lệ";
        }

        try {
            const signInMethods = await auth().fetchSignInMethodsForEmail(inputEmail);
            if (signInMethods.length > 0) {
                return "Email đã tồn tại";
            }
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                return "Email không hợp lệ";
            } else {
                return "Đã xảy ra lỗi. Vui lòng thử lại sau!";
            }
        }

        return "";
    }

    const validatePasswords = () => {
        const minLength = 8;
        const hasLowercase = /[a-z]/;
        const hasUppercase = /[A-Z]/;
        const hasDigit = /\d/;

        if (!password) {
            return "Mật khẩu không được bỏ trống";
        } else if (password.length < minLength) {
            return `Mật khẩu phải có ít nhất ${minLength} ký tự`;
        } else if (!hasLowercase.test(password)) {
            return "Mật khẩu phải có ít nhất một chữ cái thường";
        } else if (!hasUppercase.test(password)) {
            return "Mật khẩu phải có ít nhất một chữ cái hoa";
        } else if (!hasDigit.test(password)) {
            return "Mật khẩu phải có ít nhất một chữ số";
        }

        if (!confirmPassword) {
            return "Mật khẩu xác nhận không được bỏ trống";
        } else if (confirmPassword !== password) {
            return "Mật khẩu xác nhận không khớp với mật khẩu";
        }

        return "";
    }

    const handleSignup = async () => {
        let isValid = true;

        const emailError = await validateEmail(email);
        const passwordError = validatePasswords();

        if (emailError) {
            setEmailError(emailError);
            isValid = false;
        } else {
            setEmailError("");
        }

        if (passwordError) {
            setPasswordError(passwordError);
            setConfirmPasswordError(passwordError);
            isValid = false;
        } else {
            setPasswordError("");
            setConfirmPasswordError("");
        }

        if (isValid) {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async (userCredential) => {
                    console.log('Đăng ký thành công!');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    const user = userCredential.user;
                    addToJsonServer(user);

                    Alert.alert('Đã tạo tài khoản thành công!');
                })
                .catch(error => {
                    console.log('Lỗi đăng ký:', error);
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert('Email đã tồn tại!');
                    } else if (error.code === 'auth/invalid-email') {
                        Alert.alert('Email không hợp lệ!');
                    } else {
                        Alert.alert('Đã xảy ra lỗi. Vui lòng thử lại sau!' + error.message);
                    }
                });
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.bground} source={require('../image/imgbackground.jpg')} resizeMode='stretch'>
                <TouchableOpacity onPress={handleBack} style={{ position: 'absolute', top: 20, left: 10 }}>
                    <AntDesign name='left' size={30} color='#ffffff' />
                </TouchableOpacity>
                <Image style={styles.img} resizeMode='contain' source={require('../image/logo.png')} />
                <TextInput
                    style={[styles.tinput, emailError ? styles.errorInput : null]}
                    placeholder='Email'
                    onChangeText={text => {
                        setEmail(text);
                        setEmailError("");
                        validateEmail(text).then(error => setEmailError(error));
                    }}
                    value={email}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                <View style={[styles.passwordContainer, passwordError ? styles.errorInput : null]}>
                    <TextInput
                        style={styles.tinputPassword}
                        placeholder='Mật khẩu'
                        onChangeText={text => {
                            setPassword(text);
                            if (passwordError) setPasswordError("");
                            validatePasswords();
                        }}
                        value={password}
                        secureTextEntry={secureTextEntry}
                    />
                    <TouchableOpacity style={{ position: 'absolute', right: 15 }} onPress={() => setSecureTextEntry(!secureTextEntry)}>
                        <Ionicons
                            name={secureTextEntry ? "eye-off" : "eye"}
                            size={20}
                            color="grey"
                        />
                    </TouchableOpacity>
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                <View style={[styles.passwordContainer, confirmPasswordError ? styles.errorInput : null]}>
                    <TextInput
                        style={styles.tinputPassword}
                        placeholder='Mật khẩu xác nhận'
                        onChangeText={text => {
                            setConfirmPassword(text);
                            if (confirmPasswordError) setConfirmPasswordError("");
                            validatePasswords();
                        }}
                        value={confirmPassword}
                        secureTextEntry={secureConfirmTextEntry}
                    />
                    <TouchableOpacity style={{ position: 'absolute', right: 15 }} onPress={() => setSecureConfirmTextEntry(!secureConfirmTextEntry)}>
                        <Ionicons
                            name={secureConfirmTextEntry ? "eye-off" : "eye"}
                            size={20}
                            color="grey"
                        />
                    </TouchableOpacity>
                </View>
                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
                <View>
                    <TouchableOpacity onPress={handleSignup} style={styles.btn}>
                        <View style={styles.custombtn}>
                            <Text style={styles.txt}>ĐĂNG KÝ</Text>
                        </View>
                    </TouchableOpacity>
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
        width: '100%',
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
