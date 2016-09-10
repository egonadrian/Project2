var prompt = require('prompt-sync')();
var fs = require('fs');
var csv = require('csv');

function readCsv(filename, callback) {
 fs.readFile(filename, function (err, data) {
   if (err) throw err;
   csv.parse(data, function(err, dataParsed) {
     if(err) throw err;

     callback(dataParsed);
   });
 });
}

//Add
function addNewContact(data){
 newContact = {
   first_name: prompt('first name '),
   last_name: prompt('last name '),
   phone: prompt('phone number '),
   email: prompt('email '),
   city: prompt('city '),
   zipcode: prompt('zipcode '),
   website: prompt('website '),
   company: prompt('company ')
 };
 data.push(newContact);
 writeCsv('example.csv', data)
};

function searchByEmail(data){
 var email = prompt('Enter email: ');
 for (i = 1; i < data.length; i++) {
   if (data[i][3] === email){
     return data[i][3];
   };
 };
}

// Update
function update(data){
 searchByEmail(data);
 delete data[i];
 addNewContact(data);
}



// search
function search(data){
 searchByEmail(data);
 console.log(data[i]);
};

// delete
function deleteContact(data){
 searchByEmail(data);
 delete data[i];
 writeCsv('example.csv', data);

};

//count
function contactCounter(data){
   console.log(data.length - 1);
};

//help
function help(){
 console.log('This aplication can ADD, DELETE, UPDATE, COUNT and SEARCH on your contact list');
}


function writeCsv(filename, data){
 csv.stringify(data, { header:true }, function(err, data) {
   if (err) throw err;
   fs.writeFile(filename, data, function(err){
     if (err) throw err;
   });
 });
}


// main
switch (process.argv[2]) {
 case 'add':
   callback = addNewContact;
   break;
 case 'search':
   callback = search;
   break;
 case 'delete':
   callback = deleteContact;
   break;
 case 'count':
   callback = contactCounter;
   break;
 case 'update':
   callback = update;
   break;
 case 'help':
   callback = help;
   break;
 default:
   throw 'no option found'
   break;
};

readCsv('example.csv', callback);
