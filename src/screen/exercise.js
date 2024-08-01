import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Button } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import TrackPlayer from 'react-native-track-player';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Exercise = () => {
    const [showThien, setShowThien] = useState(false);
    const [yogaVideo, setYogaVideo] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const openModalThien = () => {
        setShowThien(true);
    };

    const handleCloseModalThien = () => {
        setShowThien(false);
    };

    const openYogaVideo = () => {
        setYogaVideo(true);
    };

    const handleCloseYogaVideo = () => {
        setYogaVideo(false);
    };

    useEffect(() => {
        console.log("start render");
        setupApp();
    }, []);

    const setupApp = async () => {
        console.log("setup player");
        // khởi tạo cho player
        await TrackPlayer.setupPlayer();

        // định nghĩa danh sách track
        let listTrack = [
            {
                id: '1',
                url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3',
                title: 'Password Infinity',
                artist: '',
            }
        ];
        // đưa track vào player
        await TrackPlayer.add(listTrack);

        console.log("Finish setup");
    };

    //--- hàm điều khiển
    const PlayMusic = () => {
        // hàm chạy nhạc
        console.log("play music");
        TrackPlayer.play();
    };

    const PauseMusic = () => {
        console.log("pause music");
        TrackPlayer.pause();
    };



    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Thiền</Text>
            <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'black' }}></View>
            <TouchableOpacity style={styles.btn} onPress={openModalThien}>
                <Image style={styles.img} resizeMode='cover' source={require('../image/thien.jpg')} />
                <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'black' }}></View>
                <Text style={styles.txt}>Khám phá sự bình yên và tĩnh lặng với tính năng thiền của chúng tôi. Tính năng này cung cấp các âm thanh thư giãn và thời gian tập luyện linh hoạt, giúp bạn giảm căng thẳng và tìm lại sự cân bằng trong cuộc sống.</Text>
            </TouchableOpacity>

            <Text style={styles.headerText}>Yoga</Text>
            <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'black' }}></View>
            <TouchableOpacity style={styles.btn} onPress={openYogaVideo}>
                <Image style={styles.img} resizeMode='cover' source={require('../image/yoga.jpg')} />
                <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'black' }}></View>
                <Text style={styles.txt}>Khám phá sức mạnh của yoga với tính năng của chúng tôi. Ứng dụng cung cấp các bài tập yoga đa dạng, kèm theo hướng dẫn chi tiết và video minh họa.</Text>
            </TouchableOpacity>

            <Modal
                visible={showThien}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseModalThien}
            >
                <TouchableWithoutFeedback onPress={handleCloseModalThien}>
                    <View style={styles.khungModal}>
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}>Nhạc thiền</Text>
                            <Image style={styles.imgg} resizeMode='stretch' source={require('../image/thien.jpg')} />
                            <View style={{ flexDirection: `column` }}>
                                <TouchableOpacity style={styles.saveButton} onPress={PlayMusic}>
                                    <Text style={styles.saveButtonText}>Play</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.saveButton} onPress={PauseMusic}>
                                    <Text style={styles.saveButtonText}>Pause</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                visible={yogaVideo}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseYogaVideo}
            >
                <TouchableWithoutFeedback onPress={handleCloseYogaVideo}>
                    <View style={styles.khungModall}>
                        <View style={styles.modall}>
                            <Text style={styles.modalTitlee}>Bài tập yoga</Text>
                            <Video
                                ref={videoRef}
                                source={require('../image/videoyoga.mp4')}
                                style={styles.video}
                                paused={!isPlaying}
                            />
                            <View style={{ flexDirection: `row`, marginTop: 10 }}>
                                <View style={{ width: 100, margin: 10 }}>
                                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => setIsPlaying(!isPlaying)}>
                                        <Ionicons name={isPlaying ? 'pause' : 'play'} size={40} color='black' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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
    },
    khungModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modal: {
        width: 350,
        backgroundColor: '#C2FFF3',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 30
    },
    khungModall: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modall: {
        width: '100%',
        backgroundColor: '#C2FFF3',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    modalTitlee: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 30
    },
    video: {
        width: '100%',
        height: 200,
        backgroundColor: 'black',
        marginTop: 30
    },
    imgg: {
        width: '100%',
        height: 240,
        marginVertical: 30
    },
    saveButton: {
        width: 100,
        height: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        marginTop: 20
    },
    saveButtonText: {
        color: '#C2FFF3',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
