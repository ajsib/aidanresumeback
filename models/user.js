const bcrypt = require('bcryptjs');

const User = function(db, username, password) {
  this.db = db;
  this.username = username;
  this.password = password;
};

User.prototype.save = async function() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  return this.db.collection('users').insertOne({ username: this.username, password: hash });
};

User.prototype.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;
