import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import { config } from '../config/config';
import { Colors } from '../constants/Colors';
import DisplayList from '../components/DisplayList';
import DisplayScreenshot from '../components/DisplayScreenshot';

function DetailsScreen({ route }) {
    const { projectId } = route.params;
    const [project, setProject] = useState({});
    const [screenshot, setScreenshot] = useState(null);

    useEffect(() => {
        fetch(`${config.SERVER.URL}/api/project/${projectId}`)
            .then(resp => resp.json())
            .then(data => setProject(data))
            .catch(err => console.log('err:: ', err))
    }, [])
    useEffect(() => {
        if (project && project.screenshotId && project.screenshotId.length) {
            fetch(`${config.SERVER.URL}/api/image/${project.screenshotId}`)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data.img)
                    setScreenshot(data.img.data.data)
                })
                .catch(err => console.log('err=>>', err))
        }
    }, [project])


    if (!Object.keys(project).length) return null;

    return (
        <ScrollView >
            <View style={styles.container}>
                <Text style={styles.subSection}>{project.cohort_num}</Text>
                <Text style={styles.subSection}>{project.project_num}</Text>
                {project.project_name && <>
                    <Text style={styles.subSection}>Project Name</Text>
                    <Text style={styles.textStyle}>{project.project_name}</Text>
                </>}
                {project.team_name && <>
                    <Text style={styles.subSection}>Team Name</Text>
                    <Text style={styles.textStyle}>{project.team_name}</Text>
                </>}

                {screenshot && <DisplayScreenshot />}

                <Text style={styles.subSection}>Description</Text>
                <Text style={styles.textStyle}>{project.description}</Text>
                {project.name_team_member && <>
                    <Text style={styles.subSection}>Framework</Text>
                    <DisplayList
                        data={project.name_team_member}
                        contentContainerStyle={styles.listItem}
                        textStyle={styles.item}
                    />
                </>}
                {project.language && <>
                    <Text style={styles.subSection}>Languages</Text>
                    {/* <View style={styles.list}> */}
                    <DisplayList
                        data={project.language}
                        contentContainerStyle={styles.listItem}
                        textStyle={styles.item}
                    />
                    {/* </View> */}
                </>}
                {project.framework && <>
                    <Text style={styles.subSection}>Framework</Text>
                    <DisplayList
                        data={project.framework}
                        contentContainerStyle={styles.listItem}
                        textStyle={styles.item}
                    />
                </>}
                {project.database && <>
                    <Text style={styles.subSection}>Server/Database</Text>
                    <DisplayList
                        data={project.database}
                        contentContainerStyle={styles.listItem}
                        textStyle={styles.item}
                    />
                </>}
                {project.key_feature && project.key_feature.lenght && <>
                    <Text style={styles.subSection}>Features</Text>
                    <DisplayList
                        data={project.key_feature}
                        contentContainerStyle={styles.listItem}
                        textStyle={styles.item}
                    />
                </>}
                {project.extra_tools && project.extra_tools.lenght && <>
                    <Text style={styles.subSection}>Extra</Text>
                    <DisplayList
                        data={project.extra_tools}
                        contentContainerStyle={styles.listItem}
                        textStyle={styles.item}
                    />
                </>}
                {project.website && <Text onPress={() => Linking.openURL(project.website)} style={styles.subSection}>{project.website}</Text>}
                {project.repository && <Text onPress={() => Linking.openURL(project.repository)} style={styles.subSection}>{project.repository}</Text>}
            </View>
        </ScrollView >
    )
}

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 0,

    },
    subSection: {
        textDecorationLine: 'underline',
        color: Colors.title,
        marginTop: 10,
        fontSize: 20
    },
    textStyle: {
        marginTop: 8,
        fontSize: 16,
        color: Colors.text
    },
    list: {
        flex: 1,
        flexWrap: 'wrap',
    },
    listItem: {
        color: Colors.text,
        alignItems: 'center'
    },
    item: {
        color: Colors.text
    },
    image: {
        width: '80%',
        height: '30%',
        padding: 10
    }
})
