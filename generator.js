var csv = require('csv');
var fs = require('fs');
var faker = require('faker');

var columns = {
  first_name: 'first_name',
  last_name: 'last_name',
  phone: 'phone',
  email: 'email',
  city: 'city',
  zipcode: 'zipcode',
  website: 'website',
  company: 'company'
};

function fakeContact() {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    city: faker.address.city(),
    zipcode: faker.address.zipCode(),
    website: faker.internet.domainName(),
    company: faker.company.companyName()
  };
};

csv.generate({ objectMode: true, seed: 1, columns: columns, length: 50 })
  .pipe(csv.transform(function() {
    return fakeContact();
  }))
  .pipe(csv.stringify({ header: true }))
  .pipe(fs.createWriteStream('example.csv'));
