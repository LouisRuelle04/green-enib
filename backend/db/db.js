const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', //'localhost' si dev en local
    user: 'root',
    password: 'root',
    database: 'greenenib',
    waitForConnections: true,
    connectionLimit: 10,  
    queueLimit: 0
});

const db = pool.promise();

module.exports = {db};
