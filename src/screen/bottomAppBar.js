import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Setting from './setting';
import Health from './health';
import Spirit from './spirit';
import Exercise from './exercise';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomHeader = ({ onSettingPress }) => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Bee Yourself</Text>
        {onSettingPress && (
            <TouchableOpacity onPress={onSettingPress} style={styles.settingButton}>
                <Ionicons name="exit-outline" size={26} color="black" />
            </TouchableOpacity>
        )}
    </View>
);

const SpiritStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="SpiritScreen"
            component={Spirit}
            options={{
                header: () => <CustomHeader />
            }}
        />
    </Stack.Navigator>
);

const HealthStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="HealthScreen"
            component={Health}
            options={{
                header: () => <CustomHeader />
            }}
        />
    </Stack.Navigator>
);

const ExerciseStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="ExerciseScreen"
            component={Exercise}
            options={{
                header: () => <CustomHeader />
            }}
        />
    </Stack.Navigator>
);

const SettingStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="SettingScreen"
            component={Setting}
            options={{
                header: () => (
                    <CustomHeader
                        onSettingPress={() => {
                            auth().signOut().then(() => {
                                console.log('Sign out!');
                                navigation.navigate('Login');
                            }).catch(error => {
                                console.error('Sign out error:', error);
                            });
                        }}
                    />
                )
            }}
        />
    </Stack.Navigator>
);

const BottomAppBar = () => {
    return (
        <Tab.Navigator
            initialRouteName='Spirit'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Spirit':
                            iconName = focused ? 'clipboard' : 'clipboard-outline';
                            break;
                        case 'Health':
                            iconName = focused ? 'heart' : 'heart-outline';
                            break;
                        case 'Exercise':
                            iconName = focused ? 'barbell' : 'barbell-outline';
                            break;
                        case 'Setting':
                            iconName = focused ? 'settings' : 'settings-outline';
                            break;
                        default:
                            iconName = 'help-circle-outline';
                            break;
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    padding: 10,
                    marginBottom: 10,
                    borderRadius: 20,
                    marginHorizontal: 15,
                    backgroundColor: '#C2FFF3'
                }
            })}
        >
            <Tab.Screen name="Spirit" component={SpiritStack} />
            <Tab.Screen name="Health" component={HealthStack} />
            <Tab.Screen name="Exercise" component={ExerciseStack} />
            <Tab.Screen name="Setting" component={SettingStack} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C2FFF3',
        borderBottomLeftRadius: 60,
        marginStart: 30,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    settingButton: {
        position: 'absolute',
        right: 10
    }
});

export default BottomAppBar;
