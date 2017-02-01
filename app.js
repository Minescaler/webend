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

let ejs = require('ejs');
var session = require('express-session');
var express = require('express')
sha256 = require('js-sha256');
var app = express()
app.use(bodyparser.urlencoded({
        extended: true
    }));
var mu2 = require('mu2');
mu2.root = __dirname + '/views';
app.use(express.static(__dirname + "/"));

app.use(session({secret: 'The Ultimate Secret-123.12::'}));
var sess;

function RenderAll(req, res, file)
{
  sess=req.session;
  var loggedIn = false;
  if(sess.firstname)
	loggedIn = true;
  var htmlStream = mu2.compileAndRender(file, { 
		loggedIn:loggedIn, firstname:sess.firstname, 
		lastname:sess.lastname, email:sess.email }); 
  htmlStream.pipe(res);
}

app.get('/', function (req, res) {
  sess=req.session;
  if(sess.firstname)
    RenderAll(req, res,__dirname + '/views/loggedin.html');
  else
    RenderAll(req, res,__dirname + '/views/main.html');
})

app.get('/registerOrAccount', function (req, res) {
  sess=req.session;
  if(sess.firstname)
    RenderAll(req, res,__dirname + '/views/account.html');
  else
    RenderAll(req, res,__dirname + '/views/register.html');
})

app.get('/getBills', function (req, res) {
  sess=req.session;
  if(sess.firstname)
  {
	connection.query("SELECT ispayed, amount, DATE_FORMAT(timestamp, '%d.%m.%Y %H:%i Uhr') as timestamp from billings where userid = ?", [sess.userid], function(err, rows, fields) {
    if (!err)
	{
	  res.write('<ul>');
      for(var i = 0; i < rows.length; i++)
      {
		res.write('<li>');
		if(rows[i].ispayed == 0)
			res.write('<strong>');
		res.write(rows[i].amount + "&euro; erstellt am " + rows[i].timestamp);
		if(rows[i].ispayed == 0)
			res.write(' noch nicht bezahlt</strong>');
        res.write('</li>');
      }
	  res.write('</ul>');
	}
    else
      console.log('Error while performing Query.');
	res.end();
  });
  }
  else
  {
    res.end();
  }
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

app.post('/register/', function (req, res) {
  sess=req.session;
  if(sess.firstname)
  {
    res.send('You already have an account.');
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
      sess.firstname = firstname;
      sess.lastname  = lastname;
      sess.password  = password;
      sess.email     = email;
      // START MINECRAFT SERVER HERE!!!!!!!
	  // res.send('Welcome to the BLOCK World, 2edgy4me.');
	  res.redirect("/");
    }
    else
      res.send('You are not cool eneugh! No, just kidding. We have some serious problems up here dude... come again later. ok?' + err);
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
        res.redirect("/");
      }
      else
        res.send('Wrong E-Mail or Password.');
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
	  }
	  res.redirect('/');
	});
  }
  else
  {
    res.send('You are already logged in!');
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
		// KILL MINECRAFT SERVER HERE!!!
        res.redirect('/');
      }
    });
  }
  else
  {
    res.send('You are not logged in dude.');
  }  
})



