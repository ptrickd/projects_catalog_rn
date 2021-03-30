import React, { useState, useEffect } from 'react'
import { View, Image } from 'react-native';

function DisplayScreenshot() {
    const [screenshot]
    const convertToBase64 = (arrayBuffer) => {
        let u8 = new Uint8Array(arrayBuffer)
        let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer), function (p, c) { return p + String.fromCharCode(c) }, ''))
        // let mimetype = "image/jpeg"
        // return "data:" + mimetype + ";base64," + b64encoded
        return b64encoded
    }

    useEffect(() => {
        if (props && props.img) {
//         // console.log('image in screenshot comp', props.img.img.data.data)
//         setScreenshotBase64(convertToBase64(props.img.img.data.data))
//     }
    }, [])

    return (
        <View>
            <Image
                style={styles.image}
                source={{
                    // uri: 'https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2018/img/PC_Hardware/XCM_1095776_Manual_750x375_1095776_us_pc_hardware_pcit_maincomputersstorefront_tablets_v3_cg_750x375_jpg_PCIT_PCIT_mainComputersStorefront_Additional_Stock_photos.jpg'
                    uri: `data:image/png;base64,${screenshot}`
                }}
            />
        </View>
    )
}

export default DisplayScreenshot;


// return (
//     <div className='mt-3 mb-4'>
//         <h3 className="">Screenshot</h3>
//         <img
//             className=""
//             src={`data:image/png;base64,${screenshotBase64}`} />