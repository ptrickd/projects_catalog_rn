import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ListContainer from '../components/ListContainer';

function HomeView() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>EvolveU Projects</Text>
            <ListContainer />
        </View>
    )
}

export default HomeView;

const styles = StyleSheet.create({
    container: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 40,
        marginBottom: 20,
        padding: 20,
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        fontSize: 25
    }
})
