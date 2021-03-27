import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cardData } from '../constants/fakeData';

function Card({ cohort, projectName, names }) {

    const renderedNames = () => {
        return names.map(name => {
            return <Text key={name}>{name}</Text>
        }
        )
    }
    return (
        <View style={styles.container}>
            <Text>{cohort}</Text>
            <Text>{projectName}</Text>
            <View style={styles.listNames}>
                {renderedNames()}
            </View>

        </View>
    )

};

export default Card;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        marginTop: 10,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listNames: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

