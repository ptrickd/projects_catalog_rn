import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import Base64 from './Base64';

function DisplayScreenshot({ screenshot }) {
    const [screenshotBase64, setScreenshotBase64] = useState(null);
    const convertToBase64 = (arrayBuffer) => {
        let u8 = new Uint8Array(arrayBuffer)
        // let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer), function (p, c) { return p + String.fromCharCode(c) }, ''))
        let b64encoded = Base64.btoa([].reduce.call(new Uint8Array(arrayBuffer), function (p, c) { return p + String.fromCharCode(c) }, ''));
        // let mimetype = "image/jpeg"
        // return "data:" + mimetype + ";base64," + b64encoded
        return b64encoded
    }

    useEffect(() => {
        if (screenshot && screenshot.img) {
            setScreenshotBase64(convertToBase64(screenshot.img.data.data))
        }
    }, [])

    if (!screenshotBase64) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.subSection}>Screenshot</Text>
            <Image
                style={styles.image}
                source={{
                    uri: `data:image/png;base64,${screenshotBase64}`
                }}
            />
        </View>
    )
}

export default DisplayScreenshot;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center'
    },
    subSection: {
        textDecorationLine: 'underline',
        color: Colors.title,
        marginTop: 10,
        fontSize: 20
    },
    image: {
        width: '80%',
        height: '100%',
        padding: 0
    }
})
