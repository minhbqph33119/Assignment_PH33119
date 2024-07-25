import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

const Setting = () => {


    const [showModal, setShowModal] = useState(false);
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
    ]);

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                <TouchableOpacity style={{ width: '100%', height: 60, borderRadius: 50, backgroundColor: 'lightgray', justifyContent: 'center', marginTop: 20 }}
                    onPress={() => setShowModal(true)}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 20 }}>Thông tin cá nhân</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '100%', height: 60, borderRadius: 50, backgroundColor: 'lightgray', justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 20 }}>Tình trạng sức khỏe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '100%', height: 60, borderRadius: 50, backgroundColor: 'lightgray', justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 20 }}>Tư vấn tâm lý</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '100%', height: 60, borderRadius: 50, backgroundColor: 'lightgray', justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 20 }}>Thống kê</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '100%', height: 60, borderRadius: 50, backgroundColor: 'lightgray', justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 20 }}>Thay đổi giao diện</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '100%', height: 60, borderRadius: 50, backgroundColor: 'lightgray', justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 20 }}>Đổi mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '100%', height: 60, borderRadius: 50, backgroundColor: 'lightgray', justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 20 }}>Cài đặt chung</Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={showModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                    <View style={styles.khungModal}>
                        <View style={styles.modal}>

                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
            {/* <View style={styles.form}>
                <TextInput
                    style={styles.tinput}
                    placeholder='Chiều cao'
                    onChangeText={setHeight}
                    value={height}
                />
                <TextInput
                    style={styles.tinput}
                    placeholder='Cân nặng'
                    onChangeText={setWeight}
                    value={weight}
                />
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Select your gender"
                    style={styles.dropdown}
                    containerStyle={{ width: '90%', alignSelf: 'center', marginTop: 10 }}
                />
            </View> */}
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        alignSelf: 'center',
        marginTop: 30,
        height: 400,
        width: '90%',
        borderRadius: 50,
        borderWidth: 1,
    },
    tinput: {
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 30,
        width: '90%',
        marginTop: 10,
        padding: 10,
    },
    dropdown: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        borderWidth: 0,
    },
    khungModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modal: {
        width: 350,
        height: 550,
        backgroundColor: '#C2FFF3',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
});
