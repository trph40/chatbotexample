// Initialize RiveScript
const bot = new RiveScript();
import { transliterate } from 'https://cdn.jsdelivr.net/npm/transliteration@2.1.8/dist/browser/bundle.esm.min.js';
console.log(transliterate('你好'));
// Load RiveScript scripts (including custom files)
bot.loadFile([
    'custom2.rive' // Replace with the path to your custom .rive file
]).then(ready).catch(errorHandler);

// Function called when RiveScript is ready
function ready() {
    bot.sortReplies();
    console.log('RiveScript ready!');
}

// Function to handle user input
function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim().toLowerCase(); // Trim and convert to lowercase
    if (userInput === '') return; // Ignore empty messages

    // Transliterate Cyrillic text to Latin
    const transliteratedInput = transliterate(userInput);
    console.log(transliteratedInput);

    displayMessage(userInput, 'user');
    bot.reply('local-user', transliteratedInput).then(function(reply) {
        displayMessage(reply, 'bot');
    });

    document.getElementById('user-input').value = ''; // Clear input field
}

// Function to display messages
function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
}

// Error handler for RiveScript
function errorHandler(error) {
    console.error('RiveScript Error:', error);
}

// Add event listener for Enter key on input field
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
