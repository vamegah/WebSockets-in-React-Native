import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default function UsernameScreen({ navigation }) {
    const [username, setUsername] = useState('');

    const handleContinue = () => {
        navigation.navigate('ChatScreen', { username });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter a Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Type your username"
                value={username}
                onChangeText={setUsername}
            />
            <Pressable
                style={[styles.button, !username.trim() && styles.disabledButton]}
                onPress={handleContinue}
                disabled={!username.trim()}
            >
                <Text style={{ color: "white" }}>Continue to Chat</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        width: '80%'
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: '60%'
    },
    disabledButton: {
        backgroundColor: 'gray',
    }
});
