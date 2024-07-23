import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, FlatList, TouchableWithoutFeedback, Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { addSpiritAPI, deleteSpiritAPI, editSpiritAPI, fetchSpirit } from '../redux/actions/spiritAction';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Spirit = () => {
    const userid = auth().currentUser;

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    const [idEdit, setIdEdit] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editDate, setEditDate] = useState("");

    const [error, setError] = useState("");
    const [editError, setEditError] = useState("");

    const listSpirit = useSelector(state => state.spirit.listSpirit);

    const getCurrentDate = useCallback(() => {
        const now = new Date();
        const date = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        return `${date}-${month}-${year}`;
    }, []);

    const handleAdd = useCallback(() => {
        if (title.trim() === "" || content.trim() === "") {
            setError("Vui lòng nhập đầy đủ tiêu đề và nội dung.");
            return;
        }
        let newSpirit = {
            userid: userid.uid,
            date: getCurrentDate(),
            title: title,
            content: content
        };
        dispatch(addSpiritAPI(newSpirit))
            .unwrap()
            .then(() => {
                setTitle('');
                setContent('');
                setShowModal(false);
                setError('');
            })
            .catch(error => {
                console.error(error);
            });
    }, [dispatch, userid, title, content, getCurrentDate]);

    const handleDelete = (id) => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa không ?",
            [
                {
                    text: 'Xóa',
                    onPress: () => {
                        dispatch(deleteSpiritAPI(id));
                        setShowDetailModal(false);
                    }
                },
                {
                    text: 'Hủy',
                    onPress: () => { }
                }
            ]
        )
    };

    const handleEdit = (id, title, content, date) => {
        setIdEdit(id);
        setEditTitle(title);
        setEditContent(content);
        setEditDate(date);
    };

    const handleUpdate = () => {
        if (editTitle.trim() === "" || editContent.trim() === "") {
            setEditError("Vui lòng nhập đầy đủ tiêu đề và nội dung.");
            return;
        }
        dispatch(editSpiritAPI({ id: idEdit, title: editTitle, content: editContent, date: editDate }))
            .unwrap()
            .then(() => {
                setIdEdit("");
                setEditTitle("");
                setEditContent("");
                setEditDate("");
                setShowDetailModal(false);
                setEditError("");
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleItemPress = useCallback((item) => {
        // Nếu đang ở chế độ chỉnh sửa, đóng modal chỉnh sửa
        if (idEdit) {
            setIdEdit("");
            setEditTitle("");
            setEditContent("");
            setEditDate("");
        }
        setSelectedItem(item);
        setShowDetailModal(true);
    }, [idEdit]);

    const itemSpirit = ({ item, index }) => (
        <TouchableOpacity onPress={() => handleItemPress(item)}>
            <View style={styles.itemContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.itemTitle}>{index + 1}. </Text>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                </View>
                <Text style={styles.itemContent}>Viết ngày: {item.date}</Text>
            </View>
        </TouchableOpacity>
    );

    useEffect(() => {
        dispatch(fetchSpirit());
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Lời cảm ơn, hạnh phúc</Text>
            <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'black' }}></View>
            <FlatList
                data={listSpirit}
                renderItem={itemSpirit}
                keyExtractor={(item, index) => index.toString()}
            />

            <TouchableOpacity style={styles.floatingButton} onPress={() => setShowModal(true)}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

            <Modal
                visible={showModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                    <View style={styles.khungModal}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modal}>
                                <Text style={styles.modalTitle}>Hôm nay của bạn thế nào? </Text>
                                <Text style={{ position: 'absolute', top: 55, right: 30 }}>{getCurrentDate()}</Text>
                                <TextInput
                                    style={styles.tinput}
                                    placeholder='Tiêu đề'
                                    onChangeText={(text) => {
                                        setTitle(text);
                                        setError('');
                                    }}
                                    value={title}
                                />
                                <TextInput
                                    style={styles.tinput}
                                    placeholder='Lời biết ơn, hạnh phúc'
                                    multiline={true}
                                    numberOfLines={15}
                                    onChangeText={(text) => {
                                        setContent(text);
                                        setError('');
                                    }}
                                    value={content}
                                />
                                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={handleAdd}
                                >
                                    <Text style={styles.txt}>Hoàn thành</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                visible={showDetailModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDetailModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowDetailModal(false)}>
                    <View style={styles.khungModal}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modal}>
                                {
                                    (idEdit === selectedItem?.id) ?
                                        (<>
                                            <TextInput
                                                style={styles.tinput}
                                                value={editTitle}
                                                onChangeText={(text) => {
                                                    setEditTitle(text);
                                                    setEditError('');
                                                }}
                                                placeholder='Tiêu đề'
                                            />
                                            <Text>Viết ngày: {selectedItem?.date}</Text>
                                            <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'gray', marginVertical: 15 }}></View>
                                            <TextInput
                                                style={styles.tinput}
                                                placeholder='Lời biết ơn, hạnh phúc'
                                                multiline={true}
                                                numberOfLines={15}
                                                onChangeText={(text) => {
                                                    setEditContent(text);
                                                    setEditError('');
                                                }}
                                                value={editContent}
                                            />
                                            {editError ? <Text style={styles.errorText}>{editError}</Text> : null}
                                            <TouchableOpacity
                                                style={styles.btn}
                                                onPress={handleUpdate}
                                            >
                                                <Text style={styles.txt}>Cập nhật</Text>
                                            </TouchableOpacity>
                                        </>) :
                                        (<>
                                            <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
                                            <Text>Viết ngày: {selectedItem?.date}</Text>
                                            <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'gray', marginVertical: 15 }}></View>
                                            <Text style={{ alignSelf: 'flex-start', marginTop: 10, fontSize: 15, marginHorizontal: 5 }}>{selectedItem?.content}</Text>
                                            <View style={{ position: 'absolute', bottom: 30, flexDirection: 'row', width: '50%', justifyContent: 'space-around' }}>
                                                <TouchableOpacity onPress={() => handleEdit(selectedItem?.id, selectedItem?.title, selectedItem?.content, selectedItem?.date)}>
                                                    <AntDesign name='edit' size={30} color='#000000' />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => handleDelete(selectedItem?.id)}>
                                                    <AntDesign name='delete' size={30} color='#000000' />
                                                </TouchableOpacity>
                                            </View>
                                        </>)
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

export default Spirit;

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
    floatingButton: {
        position: 'absolute',
        bottom: 15,
        right: 20,
        width: 55,
        height: 55,
        borderRadius: 15,
        backgroundColor: '#C2FFF3',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: 'gray',
        fontSize: 30,
    },
    tinput: {
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 30,
        width: '90%',
        marginTop: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
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
    modalTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        paddingBottom: 10,
    },
    btn: {
        width: 150,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 20,
    },
    txt: {
        color: '#C2FFF3',
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemContainer: {
        backgroundColor: 'lightgray',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        flexDirection: 'column'
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemContent: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 10,
    },
});
