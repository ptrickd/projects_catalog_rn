import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import { cardData } from '../constants/fakeData';

function ListContainer() {

    const renderedCards = () => {
        return cardData.map(card => {
            console.log(card)
            return <Card
                names={card.name_team_member}
                cohort={card.cohort_num}
                projectName={card.project_name}
            />
        })
    }
    const renderedByProjectNum = () => {
        let listProjectNum = [];
    }
    return (
        <View style={styles.container}>
            {renderedCards()}
        </View>
    )
}

export default ListContainer;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '80%',
        padding: 10,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});