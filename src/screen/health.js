import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Health = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.headerText}>00:00</Text>
        <Text style={styles.titleText}>TIME</Text>
      </View>
      <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'gray', marginTop: 10 }}></View>
      <View style={styles.box}>
        <Text style={styles.headerText}>0.00</Text>
        <Text style={styles.titleText}>MILES</Text>
      </View>
      <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'gray', marginVertical: 20 }}></View>
      <View style={styles.boxx}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text style={styles.headerTextt}>0:00</Text>
          <Text style={styles.titleTextt}>CURRENT PACE</Text>
        </View>
        <View style={{ width: 1, alignSelf: 'center', height: 100, backgroundColor: 'gray', marginTop: 20 }}></View>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text style={styles.headerTextt}>0:00</Text>
          <Text style={styles.titleTextt}>AVG PACE</Text>
        </View>
      </View>
      <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'gray', marginTop: 20 }}></View>
      <TouchableOpacity style={styles.btn} onPress={() => { Alert.alert("Bắt đầu chạy") }}>
        <Ionicons name='pause' size={45} color='#000000' />
      </TouchableOpacity>
    </View>
  )
}

export default Health

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 100,
    fontWeight: 'bold',
    color: 'black'
  },
  titleText: {
    fontSize: 30,
    color: 'gray'
  },
  boxx: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  headerTextt: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'black'
  },
  titleTextt: {
    fontSize: 20,
    color: 'gray'
  },
  btn: {
    width: 90,
    height: 90,
    borderRadius: 60,
    backgroundColor: '#C2FFF3',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 30
  }
})