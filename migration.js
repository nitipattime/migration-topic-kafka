// migration.js
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const { createTopic, deleteTopic } = require('./kafka');

const client = new Client({
    connectionString: 'postgresql://username:password@localhost:5432/migrations', // เปลี่ยนข้อมูลนี้ตามความเหมาะสม
});

const init = async () => {
    // await client.connect();
    // await client.query(`
    //     CREATE TABLE IF NOT EXISTS migrations (
    //         id SERIAL PRIMARY KEY,
    //         name TEXT UNIQUE NOT NULL,
    //         executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    //     );
    // `);
};

const migrateUp = async () => {
    await init();
    const files = fs.readdirSync(path.join(__dirname, 'migrations'));
    for (const file of files) {
        const name = path.basename(file, path.extname(file));
        // const res = await client.query('SELECT * FROM migrations WHERE name = $1', [name]);
        // if (res.rows.length === 0) {
            const { up } = require(`./migrations/${name}`);
            await up();
            // await client.query('INSERT INTO migrations (name) VALUES ($1)', [name]);
            console.log(`Migrated up: ${name}`);
        // }
    }
    await client.end();
};

const migrateDown = async () => {
    await init();
    const res = await client.query('SELECT * FROM migrations ORDER BY id DESC LIMIT 1');
    if (res.rows.length > 0) {
        const { name } = res.rows[0];
        const { down } = require(`./migrations/${name}`);
        await down();
        // await client.query('DELETE FROM migrations WHERE name = $1', [name]);
        console.log(`Migrated down: ${name}`);
    }
    await client.end();
};

module.exports = { migrateUp, migrateDown };
