import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import { config } from '../config/config';
import { Colors } from '../constants/Colors';
import DisplayList from '../components/DisplayList';
import DisplayScreenshot from '../components/DisplayScreenshot';
import Base64 from '../components/Base64';

function DetailsScreen({ route }) {
    const { projectId } = route.params;
    const [project, setProject] = useState({});
    const [screenshot, setScreenshot] = useState(null);
    const [screenshotBase64, setScreenshotBase64] = useState(null);
    useEffect(() => {
        fetch(`${config.SERVER.URL}/api/project/${projectId}`)
            .then(resp => resp.json())
            .then(data => setProject(data))
            .catch(err => console.log('err:: ', err))
    }, [])
    useEffect(() => {
        fetch(`${config.SERVER.URL}/api/image/${project.screenshotId}`)
            .then(resp => resp.json())
            .then(data => {
                // console.log(data.img)
                setScreenshot(data)
            })
            .catch(err => console.log('err=>>', err))

    }, [project])

    const convertToBase64 = (arrayBuffer) => {
        let u8 = new Uint8Array(arrayBuffer)
        let b64encoded = Base64.btoa([].reduce.call(new Uint8Array(arrayBuffer), function (p, c) { return p + String.fromCharCode(c) }, ''));
        return b64encoded
    }

    useEffect(() => {
        if (screenshot && screenshot.img) {
            setScreenshotBase64(convertToBase64(screenshot.img.data.data))
        }
    }, [screenshot])

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

                {screenshotBase64 && <DisplayScreenshot screenshot={screenshotBase64} />}

                <Text style={styles.subSection}>Description</Text>
                <Text style={styles.textStyle}>{project.description}</Text>

                <DisplayList
                    title="Team Members"
                    titleStyle={styles.subSection}
                    data={project.name_team_member}
                    contentContainerStyle={styles.listItem}
                    textStyle={styles.item}
                />

                <DisplayList
                    title="Languages"
                    titleStyle={styles.subSection}
                    data={project.language}
                    contentContainerStyle={styles.listItem}
                    textStyle={styles.item}
                />

                <DisplayList
                    title="Framework"
                    titleStyle={styles.subSection}
                    data={project.framework}
                    contentContainerStyle={styles.listItem}
                    textStyle={styles.item}
                />

                <DisplayList
                    title="Database"
                    titleStyle={styles.subSection}
                    data={project.database}
                    contentContainerStyle={styles.listItem}
                    textStyle={styles.item}
                />

                <DisplayList
                    title="Features"
                    titleStyle={styles.subSection}
                    data={project.key_feature}
                    contentContainerStyle={styles.listItem}
                    textStyle={styles.item}
                />

                <DisplayList
                    title="Extra Info"
                    titleStyle={styles.subSection}
                    data={project.extra_tools}
                    contentContainerStyle={styles.listItem}
                    textStyle={styles.item}
                />

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
        color: Colors.text,
        paddingLeft: 20,
        paddingRight: 20
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
    }
})
