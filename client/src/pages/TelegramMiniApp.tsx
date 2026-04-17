import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';

const TelegramMiniApp = () => {
    const [amount, setAmount] = useState('');
    const [contractAddress, setContractAddress] = useState('');
    const [messages, setMessages] = useState([]);
    const [speed, setSpeed] = useState('');

    const validateContractAddress = (address) => {
        return /^0x[a-fA-F0-9]{30,50}$/.test(address);
    };

    const handleSend = () => {
        if (!validateContractAddress(contractAddress)) {
            alert('Invalid contract address! Must be between 30-50 characters.');
            return;
        }
        const amountNumber = parseFloat(amount);
        if (amountNumber < 0.1 || amountNumber > 100) {
            alert('Amount must be between 0.1 and 100 SOL!');
            return;
        }

        const timestamp = new Date().toISOString();
        setMessages([...messages, { amount: amountNumber, contractAddress, speed, timestamp }]);
        // Code to send the order...
        setAmount('');
        setContractAddress('');
        setSpeed('');
    };

    return (
        <View style={{ padding: 20 }}>
            <ScrollView>
                {messages.map((msg, index) => (
                    <View key={index}>
                        <Text>Amount: {msg.amount} SOL</Text>
                        <Text>Contract Address: {msg.contractAddress}</Text>
                        <Text>Speed: {msg.speed}</Text>
                        <Text>Timestamp: {msg.timestamp}</Text>
                    </View>
                ))}
            </ScrollView>
            <TextInput 
                placeholder='Enter amount (0.1 - 100 SOL)'
                value={amount}
                onChangeText={setAmount}
            />
            <TextInput 
                placeholder='Enter contract address'
                value={contractAddress}
                onChangeText={setContractAddress}
            />
            <TextInput 
                placeholder='Select speed'
                value={speed}
                onChangeText={setSpeed}
            />
            <Button title='Send' onPress={handleSend} />
            <Text>Telegram Bot Link: [Your Telegram Bot Link]</Text>
        </View>
    );
};

export default TelegramMiniApp;