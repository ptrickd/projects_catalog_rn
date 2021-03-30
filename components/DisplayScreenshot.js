import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';


function DisplayScreenshot({ screenshot }) {


    if (!screenshot) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.subSection}>Screenshot</Text>
            <Image
                style={styles.image}
                source={{
                    uri: `data:image/png;base64,${screenshot}`
                }}
            />
        </View>
    )
}

export default DisplayScreenshot;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '50%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    subSection: {
        textDecorationLine: 'underline',
        color: Colors.title,
        marginTop: 10,
        fontSize: 20
    },
    image: {
        width: 200,
        height: 200,
        // resizeMode: 'stretch',
    }
})
