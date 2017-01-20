var bodyparser = require("body-parser");
var mysql      = require('mysql');
var connection = mysql.createConnection({ 
  host     : 'localhost', 
  user     : 'mcuser', 
  password : 'SwagDatYolo1337',
  database : 'minecraft'
});

connection.connect(function(err) {
  // connected! (unless `err` is set)
});

var session = require('express-session');
var express = require('express')
sha256 = require('js-sha256');
var app = express()
app.use(bodyparser.urlencoded({
        extended: true
    }));
app.use(express.static(__dirname + "/"));

app.use(session({secret: 'The Ultimate Secret-123.12::'}));
var sess;

app.get('/', function (req, res) {
  sess=req.session;
  if(sess.firstname)
    res.sendFile('/home/ubuntu/myapp/loggedin.html');
  else
    res.sendFile('/home/ubuntu/myapp/main.html');
/*  res.write('<form method="post" action="user/">	  <input type="text" name="email" placeholder="email"/>	  <input type="password" name="pw" placeholder="password"/>	  <input type="submit" value="login"/>	</form>');
  res.write('<form method="post" action="register/">');
  res.write('<input type="text" name="firstname" placeholder="Firstname"/>');
  res.write('<input type="text" name="lastname" placeholder="Lastname"/>');
  res.write('<input type="text" name="email" placeholder="E-Mail"/>');
  res.write('<input type="text" name="password" placeholder="Password"/>');
  res.write('<input type="submit" value="Register" />');
  res.write('</form>');*/
  if(sess.firstname)
  {
    //res.write('<form method="post" action="deleteuser/">');
    //res.write('<input type="submit" value="Account wegmachen"/></form>');
  }
  //res.send();
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

app.post('/register/', function (req, res) {
  sess=req.session;
  if(sess.firstname)
  {
    res.send('Dude! You have a accound already. You are even logged in! Holyshit!');
    return;
  }

  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var password = sha256(req.body.password);
  var email = req.body.email;

  connection.query('insert into users (firstname, lastname, email, password, serverprops) VALUES (?, ?, ?, ?, ?);',
                                      [firstname, lastname, email, password, ''], function(err, rows, fields)
  {
    if (!err)
    {
      res.send('Welcome to the BLOCK World. 2edgy5me <a href="/">Get me Back</a>');
      sess.firstname = firstname;
      sess.lastname  = lastname;
      sess.password  = password;
      sess.email     = email;
      // START MINECRAFT SERVER HERE!!!!!!!
    }
    else
      res.send('You are not cool eneugh! No, just joking. We have some serious problems up here dude... come again later. ok?' + err);
  });
})


app.post('/user/', function (req, res) {
  sess=req.session;
  if(sess.firstname)
  {
    res.send('You are already logged in.');
    return;
  }

  var email = req.body.email;
  var password = sha256(req.body.pw);
  
  connection.query('SELECT * from users where email = ? and password = ?', [email, password], function(err, rows, fields) {
    if (!err)
      if(rows.length > 0)
      {
        sess.firstname = rows[0].firstname;
        sess.lastname  = rows[0].lastname;
        sess.password  = rows[0].password;
        sess.email     = rows[0].email;
        sess.userid    = rows[0].userid;
        res.send('Hi ' + sess.firstname);
      }
      else
        res.send('Y U SO WRON!!! Y U WRON PASS? OHR EFEN EMAL!');
    else
      console.log('Error while performing Query.');
  });
})

app.post('/logout/', function (req, res) {
  sess=req.session;
  if(sess.firstname)
  {
        req.session.destroy(function(err) {
          if(err) {
            console.log(err);
          } else {
            res.redirect('/');
          }
        });
        res.redirect('/');
    
  }
  else
  {
    res.send('Du bist schon angemeldet!');
  }
})


app.post('/deleteuser/', function (req, res) {
  sess=req.session;
  if(sess.firstname)
  {
    connection.query('delete from users where userid = ?',[sess.userid], function(err, rows, fields) {
      if (!err)
      {
        req.session.destroy(function(err) {
          if(err) {
            console.log(err);
          } else {
            res.redirect('/');
          }
        });
        res.send('Account deleted');
	
	// KILL MINECRAFT SERVER HERE!!!
      }
    });
  }
  else
  {
    res.send('You are not logged in dude');
  }  
})



