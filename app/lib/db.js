import mysql from 'mysql';

const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database:"gestionnaire"
});

db.connect(function(err) {
         if (err) throw err;
        console.log('Connected!');
});

export default db
