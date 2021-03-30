import React from 'react'
import { View, Text } from 'react-native';



function DisplayList({ data, contentContainerStyle, textStyle }) {

    const renderedData = () => {
        return data.map((item, index) => {
            return (<Text key={index} style={textStyle}>{item}</ Text>)
        })
    }

    return (
        <View style={contentContainerStyle}>
            {renderedData()}
        </View>
    )
}

export default DisplayList;


