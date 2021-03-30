import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Card from './Card';
// import { listProjectNum } from '../constants/fakeData';
import { config } from '../config/config';
import { Colors } from '../constants/Colors';

function ListContainer() {
    const [projects, setProjects] = useState([]);
    const [listProjectNum, setListProjectNum] = useState([]);
    useEffect(() => {
        fetch(`${config.SERVER.URL}/api/project`)
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(err => console.log('err', err))

        fetch(`${config.SERVER.URL}/api/init/projects`)
            .then(response => response.json())
            .then(data => setListProjectNum(data))
            .catch(err => console.log(err))
    }, [])
    const renderedCards = (projectNum) => {
        return projects.map((card, index) => {
            // console.log('card._id', card._id)
            if (projectNum === card.project_num) {
                return <Card
                    key={index}
                    id={card._id}
                    names={card.name_team_member}
                    cohort={card.cohort_num}
                    projectName={card.project_name}
                />
            }
        })


    }

    const renderedByProjectNum = () => {
        return listProjectNum.map(projectNum => {
            let projectNumIncluded = false;
            for (let i = 0; i < projects.length; i++) {
                if (projects[i].project_num === projectNum.name) {
                    projectNumIncluded = true;
                    continue;
                }
            }

            if (!projectNumIncluded) return null;
            return (
                <View key={projectNum.name} >
                    <Text style={styles.subtitle}>{projectNum.name}</Text>
                    {renderedCards(projectNum.name)}
                </View>
            )
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {renderedByProjectNum()}
            </ScrollView>

        </View>
    )
}

export default ListContainer;

const styles = StyleSheet.create({
    container: {
        width: '96%',
        height: '80%',
        padding: 10,
        flex: 1,
        overflow: 'hidden'
    },
    subtitle: {
        width: '100%',
        color: Colors.title,
        fontSize: 20,
        marginTop: 15,
        paddingLeft: 15,
        alignItems: 'flex-start'
    }
});