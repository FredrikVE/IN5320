// hash.js
const bcrypt = require('bcrypt');

const plainPassword = 'pass123';
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Hashed password:', hash);
});
