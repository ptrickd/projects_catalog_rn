import React, { useEffect } from 'react'
import { View, Text } from 'react-native';



function DisplayList({ data, contentContainerStyle, textStyle, title, titleStyle }) {
    // useEffect(() => {
    //     console.log('data::', data)
    // }, [])
    const renderedData = () => {
        return data.map((item, index) => {
            return (<Text key={index} style={textStyle}>{item}</ Text>)
        })
    }
    if (!data || !data.length) return null;
    return (
        <View style={contentContainerStyle}>
            <Text style={titleStyle}>{title}</Text>
            {renderedData()}
        </View>
    )
}

export default DisplayList;


