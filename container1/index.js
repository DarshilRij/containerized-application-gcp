const express = require('express');
const app = express();
var mysql = require('mysql');
const bodyParser = require('body-parser');
const open = require('open');


app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));


var con = mysql.createConnection({
    host: "0.0.0.0",
    user: "root",
    password: "root",
    database: "mydb"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("DB Connected!");
});

app.get('/', (req, res) => {
    res.render("register.html");
})

app.post('/register', (req, res) => {

    const name = req.body.name;
    const city = req.body.city;
    const email = req.body.email;
    const password = req.body.password;

    let query = "insert into user (name, city, email, password) values (?,?,?,?)"
    console.log(req.body)
    con.query(query, [name, city, email, password], function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    // res.send("Success");
    open('https://conta2-yhm6eokk3a-ue.a.run.app/login')
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});