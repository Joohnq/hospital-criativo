const sqlite3 = require('sqlite3').verbose() //chamamos o sqlite e o verbose é um incremento para outras funcionalidades
const db = new sqlite3.Database('./workshopdev.db')


db.serialize(function(){
    db.run(`CREATE TABLE IF NOT EXISTS ideas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        title TEXT,
        category TEXT,
        description TEXT,
        link TEXT
    );`)
})    

module.exports = db 