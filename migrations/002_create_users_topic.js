// migrations/001_create_users_topic.js
const { createTopic, deleteTopic } = require('../kafka');

module.exports = {
    up: async () => {
        console.log('up users')
        // await createTopic('users');
    },
    down: async () => {
        console.log('down users')
        // await deleteTopic('users');
    }
};
