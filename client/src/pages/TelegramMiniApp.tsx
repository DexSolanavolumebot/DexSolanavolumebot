import React, { useState, useEffect, useRef } from 'react';
import './TelegramMiniApp.css';

const TelegramMiniApp = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [selectedSpeed, setSelectedSpeed] = useState('');
    const messagesEndRef = useRef(null);

    const DEPOSIT_ADDRESS = 'EBKJbyijywbTFqcZBb6BsZdZ6LAyFDcy8cNzWNEbprR4';

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = () => {
        if (inputValue) {
            const userMessage = { text: inputValue, sender: 'user', timestamp: new Date().toISOString() };
            setMessages([...messages, userMessage]);
            respondToUser(inputValue);
            setInputValue('');
        }
    };

    const respondToUser = (input) => {
        let botResponse = '';
        switch(input.toLowerCase()) {
            case 'increase holders':
                botResponse = 'Here is how you can increase holders!';
                break;
            case 'increase volume':
                botResponse = 'Here are methods to increase volume!';
                break;
            case 'support':
                botResponse = 'For support, please contact: support@example.com';
                break;
            default:
                botResponse = 'Please select an option below:';
                break;
        }
        const botMessage = { text: botResponse, sender: 'bot', buttons: menuButtons(), timestamp: new Date().toISOString() };
        setMessages(messages => [...messages, botMessage]);
    };

    const handleButtonPress = (button) => {
        if (button === 'menu') {
            respondToUser('');
        }
    };

    const menuButtons = () => {
        return (
            <div>
                <button onClick={() => handleButtonPress('increase holders')}>👥 Increase Holders</button>
                <button onClick={() => handleButtonPress('increase volume')}>📈 Increase Volume</button>
                <button onClick={() => handleButtonPress('support')}>💬 Support</button>
            </div>
        );
    };

    return (
        <div className='telegram-mini-app'>
            <div className='chat-container'>
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                        <span>{msg.text}</span>
                        <span className='timestamp'>{new Date(msg.timestamp).toLocaleString()}</span>
                        {msg.buttons && msg.buttons}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleSend(); }}
                placeholder='Type your message...'
            />
            <input
                type='number'
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder='Amount (0.1-100)'
            />
            <select onChange={(e) => setSelectedSpeed(e.target.value)}>
                <option value=''>Select Speed</option>
                <option value='fast'>⚡ Fast (1-2h)</option>
                <option value='medium'>🦎 Medium (4-6h)</option>
                <option value='slow'>🐢 Slow (12-14h)</option>
                <option value='ultra-slow'>🦥 Ultra Slow (22-24h)</option>
            </select>
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default TelegramMiniApp;