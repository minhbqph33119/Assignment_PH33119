import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInfo, editInfoAPI } from '../redux/actions/infoAction';

const Setting = () => {
    const user = auth().currentUser;
    const info = useSelector(state => state.info.objinfo);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [showHealthModal, setShowHealthModal] = useState(false);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
    ]);
    const [isEditing, setIsEditing] = useState(false);

    const [errors, setErrors] = useState({
        name: "",
        age: "",
        height: "",
        weight: ""
    });

    useEffect(() => {
        if (user?.uid) {
            dispatch(fetchInfo(user.uid));
        }
    }, [dispatch, user?.uid]);

    useEffect(() => {
        if (info) {
            setName(info.name || "");
            setAge(info.age || "");
            setEmail(info.email || "");
            setHeight(info.height || "");
            setWeight(info.weight || "");
            setValue(info.gender || null);
        }
    }, [info]);

    const openModal = () => {
        setShowModal(true);
    };

    const openHealthModal = () => {
        setShowHealthModal(true);
    };

    const validateFields = () => {
        let valid = true;
        const newErrors = {
            name: "",
            age: "",
            height: "",
            weight: ""
        };
        if (!name.trim()) {
            newErrors.name = "Tên không được để trống!";
            valid = false;
        }
        if (!age.trim()) {
            newErrors.age = "Tuổi không được để trống!";
            valid = false;
        } else if (isNaN(age) || age <= 0) {
            newErrors.age = "Tuổi phải là số dương hợp lệ!";
            valid = false;
        }
        if (!height.trim()) {
            newErrors.height = "Chiều cao không được để trống!";
            valid = false;
        } else if (isNaN(height) || height <= 0) {
            newErrors.height = "Chiều cao phải là số dương hợp lệ!";
            valid = false;
        }
        if (!weight.trim()) {
            newErrors.weight = "Cân nặng không được để trống!";
            valid = false;
        } else if (isNaN(weight) || weight <= 0) {
            newErrors.weight = "Cân nặng phải là số dương hợp lệ!";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleEdit = () => {
        if (validateFields()) {
            dispatch(editInfoAPI({
                id: user?.uid,
                name,
                age,
                email,
                gender: value,
                height,
                weight,
            }))
                .then(() => {
                    Alert.alert("Thông báo", "Cập nhật thông tin thành công!");
                    setIsEditing(false);
                })
                .catch(error => {
                    Alert.alert("Lỗi", "Có lỗi xảy ra khi cập nhật thông tin.");
                    console.error(error);
                });
        } else {
            Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin!");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setIsEditing(false);
    };

    const handleCloseHealthModal = () => {
        setShowHealthModal(false);
    };

    const calculateBMI = () => {
        if (height && weight) {
            const heightInMeters = parseFloat(height) / 100; // Convert cm to meters
            const weightInKg = parseFloat(weight);
            const bmi = weightInKg / (heightInMeters * heightInMeters);
            return bmi.toFixed(2);
        }
        return null;
    };

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return "Thiếu cân";
        if (bmi >= 18.5 && bmi < 24.9) return "Bình thường";
        if (bmi >= 25 && bmi < 29.9) return "Thừa cân";
        return "Béo phì";
    };

    const getDietRecommendations = (category) => {
        switch (category) {
            case "Thiếu cân":
                return ["Ăn nhiều bữa nhỏ trong ngày", "Tăng cường thực phẩm giàu protein", "Uống sinh tố bổ dưỡng"];
            case "Bình thường":
                return ["Duy trì chế độ ăn cân bằng", "Ăn nhiều trái cây và rau xanh", "Giảm thực phẩm nhiều đường"];
            case "Thừa cân":
                return ["Ăn ít calo hơn", "Tăng cường thực phẩm ít béo", "Uống nhiều nước"];
            case "Béo phì":
                return ["Giảm lượng calo tiêu thụ", "Tập trung vào thực phẩm nhiều chất xơ", "Tránh thực phẩm chế biến sẵn"];
            default:
                return [];
        }
    };

    const getExerciseRecommendations = (category) => {
        switch (category) {
            case "Thiếu cân":
                return ["Tập gym để tăng cơ", "Các bài tập thể lực như squats, deadlifts"];
            case "Bình thường":
                return ["Duy trì tập luyện đều đặn", "Kết hợp cardio và sức mạnh"];
            case "Thừa cân":
                return ["Tập cardio như chạy bộ hoặc đi bộ nhanh", "Thực hiện các bài tập sức mạnh"];
            case "Béo phì":
                return ["Bắt đầu với các bài tập nhẹ nhàng", "Tăng cường các bài tập cardio"];
            default:
                return [];
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                <TouchableOpacity style={styles.optionButton} onPress={openModal}>
                    <Text style={styles.optionText}>Thông tin cá nhân</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={openHealthModal}>
                    <Text style={styles.optionText}>Tình trạng sức khỏe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                    <Text style={styles.optionText}>Tư vấn tâm lý</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                    <Text style={styles.optionText}>Thống kê</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                    <Text style={styles.optionText}>Thay đổi giao diện</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                    <Text style={styles.optionText}>Đổi mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                    <Text style={styles.optionText}>Cài đặt chung</Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={showModal}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseModal}
            >
                <TouchableWithoutFeedback onPress={handleCloseModal}>
                    <View style={styles.khungModal}>
                        <View style={styles.modal}>
                            {
                                isEditing ? (
                                    <>
                                        <Text style={styles.modalTitle}>Thông tin cá nhân</Text>
                                        <TextInput
                                            style={[styles.tinput, errors.name ? styles.errorInput : {}]}
                                            value={name}
                                            onChangeText={(text) => {
                                                setName(text);
                                                setErrors({ ...errors, name: "" });
                                            }}
                                            placeholder='Họ tên'
                                        />
                                        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

                                        <TextInput
                                            style={[styles.tinput, errors.age ? styles.errorInput : {}]}
                                            value={age}
                                            onChangeText={(text) => {
                                                setAge(text);
                                                setErrors({ ...errors, age: "" });
                                            }}
                                            placeholder='Tuổi'
                                            keyboardType='numeric'
                                        />
                                        {errors.age ? <Text style={styles.errorText}>{errors.age}</Text> : null}

                                        <TextInput
                                            style={styles.tinput}
                                            value={email}
                                            editable={false}
                                            placeholder='Email'
                                        />

                                        <DropDownPicker
                                            open={open}
                                            value={value}
                                            items={items}
                                            setOpen={setOpen}
                                            setValue={setValue}
                                            setItems={setItems}
                                            placeholder="Chọn giới tính"
                                            style={styles.dropdown}
                                            containerStyle={{ width: '90%', alignSelf: 'center', marginTop: 10 }}
                                        />

                                        <TextInput
                                            style={[styles.tinput, errors.height ? styles.errorInput : {}]}
                                            value={height}
                                            onChangeText={(text) => {
                                                setHeight(text);
                                                setErrors({ ...errors, height: "" });
                                            }}
                                            placeholder='Chiều cao'
                                            keyboardType='numeric'
                                        />
                                        {errors.height ? <Text style={styles.errorText}>{errors.height}</Text> : null}

                                        <TextInput
                                            style={[styles.tinput, errors.weight ? styles.errorInput : {}]}
                                            value={weight}
                                            onChangeText={(text) => {
                                                setWeight(text);
                                                setErrors({ ...errors, weight: "" });
                                            }}
                                            placeholder='Cân nặng'
                                            keyboardType='numeric'
                                        />
                                        {errors.weight ? <Text style={styles.errorText}>{errors.weight}</Text> : null}

                                        <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
                                            <Text style={styles.saveButtonText}>Lưu</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.modalTitle}>Thông tin cá nhân</Text>
                                        <View style={styles.userInfo}>
                                            <Text style={styles.txt}>Họ tên: {name}</Text>
                                            <Text style={styles.txt}>Tuổi: {age}</Text>
                                            <Text style={styles.txt}>Email: {email}</Text>
                                            <Text style={styles.txt}>Giới tính: {value}</Text>
                                            <Text style={styles.txt}>Chiều cao: {height}</Text>
                                            <Text style={styles.txt}>Cân nặng: {weight}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                                            <AntDesign name='edit' size={25} color='#000000' />
                                        </TouchableOpacity>
                                    </>
                                )
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                visible={showHealthModal}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseHealthModal}
            >
                <TouchableWithoutFeedback onPress={handleCloseHealthModal}>
                    <View style={styles.khungModal}>
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}>Tình trạng sức khỏe</Text>
                            {height && weight ? (
                                <>
                                    <Text style={styles.txt}>Chiều cao: {height} cm</Text>
                                    <Text style={styles.txt}>Cân nặng: {weight} kg</Text>
                                    <Text style={styles.txt}>Chỉ số BMI: {calculateBMI()}</Text>
                                    <Text style={styles.txt}>Tình trạng: {getBMICategory(calculateBMI())}</Text>
                                    <Text style={styles.txt}>Gợi ý chế độ ăn uống:</Text>
                                    {getDietRecommendations(getBMICategory(calculateBMI())).map((item, index) => (
                                        <Text key={index} style={styles.txt}>- {item}</Text>
                                    ))}
                                    <Text style={styles.txt}>Gợi ý bài tập:</Text>
                                    {getExerciseRecommendations(getBMICategory(calculateBMI())).map((item, index) => (
                                        <Text key={index} style={styles.txt}>- {item}</Text>
                                    ))}
                                </>
                            ) : (
                                <Text style={styles.txt}>Vui lòng nhập chiều cao và cân nặng để tính chỉ số BMI.</Text>
                            )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

export default Setting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    optionButton: {
        width: '100%',
        height: 60,
        borderRadius: 50,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        marginTop: 20
    },
    optionText: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 20
    },
    tinput: {
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 30,
        width: '90%',
        marginTop: 10,
        padding: 10,
    },
    errorInput: {
        borderColor: 'red',
        borderWidth: 1,
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
        height: 600,
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
    userInfo: {
        alignSelf: 'flex-start'
    },
    saveButton: {
        backgroundColor: 'green',
        borderRadius: 30,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    editButton: {
        position: 'absolute',
        top: 20,
        right: 20
    },
    txt: {
        alignSelf: 'flex-start',
        fontSize: 15,
        marginVertical: 10,
        marginLeft: 10
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
        marginBottom: 10
    }
});
