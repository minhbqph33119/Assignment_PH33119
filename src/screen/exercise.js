import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Exercise = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Thiền</Text>
            <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'black' }}></View>
            <TouchableOpacity style={styles.btn}>
                <Image style={styles.img} resizeMode='cover' source={require('../image/thien.jpg')} />
                <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'black' }}></View>
                <Text style={styles.txt}>Khám phá sự bình yên và tĩnh lặng với tính năng thiền của chúng tôi. Tính năng này cung cấp các âm thanh thư giãn và thời gian tập luyện linh hoạt, giúp bạn giảm căng thẳng và tìm lại sự cân bằng trong cuộc sống.</Text>

            </TouchableOpacity>

            <Text style={styles.headerText}>Yoga</Text>
            <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'black' }}></View>
            <TouchableOpacity style={styles.btn}>
                <Image style={styles.img} resizeMode='cover' source={require('../image/yoga.jpg')} />
                <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'black' }}></View>
                <Text style={styles.txt}>Khám phá sức mạnh của yoga với tính năng của chúng tôi. Ứng dụng cung cấp các bài tập yoga đa dạng, kèm theo hướng dẫn chi tiết và video minh họa.</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

export default Exercise

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
        marginLeft: 10,
        color: 'black'
    },
    btn: {
        height: 420,
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 20,
        backgroundColor: 'lightgray'
    },
    img: {
        marginVertical: 20,
        width: '90%',
        height: 250,
        alignSelf: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    txt: {
        width: '90%',
        color: 'black',
        alignSelf: 'center',
        fontSize: 16,
        marginVertical: 10
    }
})