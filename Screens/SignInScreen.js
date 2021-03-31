import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { AuthContext } from '../components/context';

function SignInScreen() {

    const { signIn } = useContext(AuthContext);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //     console.log(text)
    // }, [text])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <View style={styles.body}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />
                <Button title="Sign In" style={styles.button} onPress={() => signIn(username, password)} />
            </View>
        </View>
    )
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',

        padding: 20
    },
    title: {
        marginTop: 50,
        fontSize: 36,
        color: Colors.title
    },
    body: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text
    },
    input: {
        width: '70%',
        height: 36,
        marginBottom: 50,
        marginTop: 10,
        fontSize: 22,
        color: Colors.text,
        borderColor: Colors.text,
        borderWidth: 3,
        borderRadius: 10
    },
    button: {
        paddingLeft: 40,
        paddingRight: 40,
        fontSize: 24,
        borderRadius: 10
    }
})