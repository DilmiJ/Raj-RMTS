// db.js
const sql = require('mssql');

const config = {
    user: 'your_username',
    password: 'your_password',
    server: 'your_server', // e.g., localhost or an IP address
    database: 'your_database',
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        trustServerCertificate: true, // Change to true for local dev / self-signed certs
    },
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch((err) => console.log('Database connection failed: ', err));

module.exports = {
    sql,
    poolPromise,
};
