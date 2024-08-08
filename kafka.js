// kafka.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'migration-client',
    brokers: ['localhost:9092'] // ระบุที่อยู่ของ Kafka broker
});

const admin = kafka.admin();

const createTopic = async (topicName) => {
    await admin.connect();
    await admin.createTopics({
        topics: [{ topic: topicName }],
    });
    await admin.disconnect();
};

const deleteTopic = async (topicName) => {
    await admin.connect();
    await admin.deleteTopics({
        topics: [topicName],
    });
    await admin.disconnect();
};

module.exports = { createTopic, deleteTopic };
