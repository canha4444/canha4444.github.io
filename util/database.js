const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    database:'node-complete',
    password:'1861997'
});

module.exports = pool.promise(); /// with this we can use promise when getting the data or post