import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth'

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    const handleSignup = () => {
        if (confirmPassword == password) {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async (userCredential) => {
                    console.log(123);

                    const user = userCredential.user;
                    addToJsonServer(user);

                    Alert.alert('Đã tạo tài khoản thành công!');
                })
                .catch(error => {
                    console.log(error);
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert('Email đã tồn tại!');
                    } else if (error.code === 'auth/invalid-email') {
                        Alert.alert('Email không hợp lệ!')
                    } else {
                        Alert.alert('Đã xảy ra lỗi. Vui lòng thử lại sau!' + error.message);
                    }

                    console.log(error)
                })
        } else {
            Alert.alert('Mật khẩu xác nhận không khớp với mật khẩu !')
        }

    }


    return (
        <View style={styles.container}>
            <ImageBackground style={styles.bground} source={require('../image/imgbackground.jpg')} resizeMode='stretch'>
                <TouchableOpacity onPress={handleBack} style={{ position: 'absolute', top: 20, left: 10 }}>
                    <AntDesign name='left' size={30} color='#ffffff' />
                </TouchableOpacity>
                <Image style={styles.img} resizeMode='contain' source={require('../image//logo.png')} />
                <TextInput style={styles.tinput} placeholder='Email' onChangeText={setEmail} value={email} />
                <TextInput style={styles.tinput} placeholder='Mật khẩu' onChangeText={setPassword} value={password} secureTextEntry={true} />
                <TextInput style={styles.tinput} placeholder='Mật khẩu xác nhận' onChangeText={setConfirmPassword} value={confirmPassword} secureTextEntry={true} />
                <View>
                    <TouchableOpacity onPress={handleSignup} style={styles.btn}>
                        <View style={styles.custombtn}>
                            <Text style={styles.txt}>ĐĂNG KÝ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', position: 'relative', top: 150 }}>
                    <View style={styles.line} />
                    <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15 }}>Nếu bạn đã có tài khoản</Text>
                        <TouchableOpacity onPress={handleBack}>
                            <Text style={{ color: '#FFFFFF', marginLeft: 5, fontWeight: 'bold', fontSize: 15 }}>Đăng Nhập</Text>
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