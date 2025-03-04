import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const socket = io('https://vamega13-3000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/');

export default function ChatScreen({ route }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { username } = route.params;

    useEffect(() => {
        socket.on('chatMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chatMessage');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            const messageData = {
                text: message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sender: username
            };

            socket.emit('chatMessage', messageData);
            setMessage('');
        }
    };

    const getAvatarColor = (name) => {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5', '#F5A623'];
        return colors[name.charCodeAt(0) % colors.length];
    };

    const renderMessage = ({ item }) => {
        const isCurrentUser = item.sender === username;
        return (
            <View style={[styles.messageContainer, isCurrentUser ? styles.sentMessage : styles.receivedMessage]}>
                {!isCurrentUser && (
                    <View style={[styles.avatar, { backgroundColor: getAvatarColor(item.sender) }]}>
                        <Text style={styles.avatarText}>{item.sender.charAt(0).toUpperCase()}</Text>
                    </View>
                )}
                <View style={styles.messageContent}>
                    {!isCurrentUser && <Text style={styles.sender}>{item.sender}</Text>}
                    <Text style={styles.messageText}>{item.text}</Text>
                    <Text style={styles.messageTime}>{item.time}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderMessage}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type a message..."
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        maxWidth: '80%',
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#d1e7ff',
        borderRadius: 8,
        padding: 8,
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        padding: 8,
    },
    messageContent: {
        flex: 1,
        marginLeft: 10,
    },
    messageText: {
        fontSize: 16,
    },
    messageTime: {
        fontSize: 12,
        color: 'grey',
        marginTop: 5,
    },
    sender: {
        fontWeight: 'bold',
        marginBottom: 3,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatarText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 10,
        borderRadius: 5,
    },
});
