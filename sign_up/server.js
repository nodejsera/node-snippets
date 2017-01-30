var express = require('express');
var fs = require('fs');
var app = express();
var crypto = require('crypto');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',									
  user     : 'root',
  password : '',
  database : 'my_db'
});


	
	
app.get('/',function(req,res){
	res.set({
			'Access-Control-Allow-Origin' : '*'
			});
	return res.redirect('/public/index.html');
}).listen(3000);
		
console.log("Server listening at : 3000");
	
app.use('/public', express.static(__dirname + '/public'));
app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
		extended: true
})); 

// Sign-up function starts here. . .

app.post('/sign_up' ,function(req,res){
	
	console.log(req.body)
	var name = req.body.name;
	var dob= req.body.dob;	
	var email= req.body.email;
	var password= req.body.password;
	var interest = req.body.interest;
	var gender = req.body.gender;
	var phone = req.body.phone;
	var country =  req.body.country;//req.body.country;
	var message = req.body.message;
	var otp= "Not Yet Defined";
	
	
	var user_json = {
		"name":name,
		"dob" : dob,
		"email":email,
		"password":password,
		"interest" : interest,
		"gender" : gender,
		"phone" : phone,
		"country":country,
		"message":message,
		"otp" : otp
		
	};
	//Here is the Query for create(i.e. Insertion) is stored in the variable "insert"
	var insert = 'INSERT INTO user_details(name,dob,email,password,interest,gender,phone,country,message,otp) VALUE(?,?,?,?,?,?,?,?,?,?)';

	//Inserting a Record in TABLE details
	connection.query(insert,[name,dob,email,password,interest,gender,phone,country,message,otp], function(Error,Record){
		if(Error){
			console.log("An Error occured : " + Error);
		}
		else{
			console.log('New Details Added Successfully');
		}
	});
	console.log("DATA is " + JSON.stringify(user_json) );
		res.set({
			'Access-Control-Allow-Origin' : '*'
			});
	return res.send('success');
	
});

app.get('/show' ,function(req,res){

connection.query('SELECT * FROM  user_details',function(err, records){
  if(err) throw err;

  console.log('Data received from Db');
  
        var data = records;
		console.log(data);
		res.set({
			'Access-Control-Allow-Origin' : '*'
			});
		return res.send(data);
});
  
});

/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::FUNCTIONS:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/


//function to generate a new otp.
function new_otp(){
			var otp = otpGenerator.generate(6, { numbers: true, alphabets: false, upperCase: false, specialChars: false });
			return otp;
}
function getHash(data){
	data += "RAjaT"
	var hash_a = crypto.createHash('md5').update(data).digest("hex");
	return hash_a;
}


