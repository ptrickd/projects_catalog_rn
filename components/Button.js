import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';

const Button = ({ title }) => {

    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.label}>{title}</Text>
            </View>
        </TouchableOpacity>



    )
};

export default Button;

const styles = StyleSheet.create({
    constainer: {
        width: '100%'
    },
    label: {
        fontSize: 24,
        width: '100%',
        color: 'white',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: Colors.text,
        paddingLeft: 90,
        paddingRight: 90,
        paddingTop: 7,
        paddingBottom: 7

    }
});