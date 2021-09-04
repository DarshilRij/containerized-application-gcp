const express = require('express');
const app = express();
var mysql = require('mysql');
const bodyParser = require('body-parser');


app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json({ limit: "100mb" }));


var con = mysql.createConnection({
    host: "34.121.74.51",
    user: "root",
    password: "root",
    database: "mydb"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("DB Connected!");
});

app.get('/', (req, res) => {
    res.render("login.html");
})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    let query = "select * from user where email=? and password=?"
    con.query(query, [email, password], function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
            res.send("Login Success");
            open("https://profilecontainer-yhm6eokk3a-ue.a.run.app/")
        } else {
            res.send("Login Failed");
        }
        console.log(result);
    });

    query = "update userState set state=active where email=?"
    con.query(query, [email], function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
            res.send("Login Success");
        } else {
            res.send("Login Failed");
        }
        console.log(result);
    });
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});