import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cardData } from '../constants/fakeData';
import { Colors } from '../constants/Colors';

function Card({ cohort, projectName, names, id }) {
    const navigation = useNavigation();
    const renderedNames = () => {

        return names.map(name => {
            return <Text
                style={styles.name}
                key={name}>{name}</Text>
        }
        )
    }
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('DetailsScreen', {
                projectId: id
            })}
        >
            <View style={styles.topSection}>

                <Text style={styles.corhortNum}>{cohort}</Text>
                <Text style={styles.projectName}>{projectName}</Text>

            </View>
            <View style={styles.listNames}>
                {renderedNames()}
            </View>



        </TouchableOpacity>
    )

};

export default Card;

const styles = StyleSheet.create({
    container: {
        width: '96%',
        padding: 10,
        marginTop: 10,
        backgroundColor: Colors.text,
        // borderColor: Colors.text,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'column',

        shadowOffset: {
            width: 20,
            height: 20
        },
        shadowColor: 'black',
        shadowOpacity: 1.0
    },
    topSection: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listNames: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',

    },
    projectName: {
        color: 'white'//Colors.text
    },
    corhortNum: {
        color: 'white'//Colors.text
    },
    name: {
        margin: 5,
        color: 'white'//Colors.text
    }

});

