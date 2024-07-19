import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { CommonActions } from '@react-navigation/native';


const Welcome = ({ navigation }) => {
    // useFocusEffect(
    //     React.useCallback(() => {
    //         setTimeout(() =>{
    //             navigation.navigate('Login')
    //         }, 3000);
    //         return() =>{
    //         };
    //     }, [])
    // );

    const handleNav = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        );
    };

    useEffect(() => {

    }, [])
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.bground} source={require('../image/imgbackgroundd.png')} resizeMode='stretch'>
                <TouchableOpacity style={styles.btn} onPress={handleNav}>
                    <View style={styles.custombtn}>
                        <Text style={styles.txt}>ĐĂNG NHẬP</Text>
                        <AntDesign name="caretright" size={19} />
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bground: {
        flex: 1,
        justifyContent: 'center'
    },
    img: {
        width: '30%',
        height: 70,
    },
    btn: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        width: 300,
        backgroundColor: '#C2FFF3',
        padding: 15,
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
    }
})