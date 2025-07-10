const mysql = require('mysql2')

const credentials = {
host: 'localhost',
user: 'root',
password: 'Lawli3t7',
database: 'express_blog_sql'
}

const connection = mysql.createConnection(credentials)

connection.connect((err)=> {
    if (err) {
        throw err;
    }
    console.info('🐬 Connected to MySQL')
})

module.exports = connection