const mongoose = require('mongoose');
const nconf = require('nconf');
const findOrCreate = require('mongoose-find-or-create')

const User = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  creature: {
    age: {days: Number, hours: Number, minutes: Number},
    condition: {alive: Boolean, asleep: Boolean, mad: Boolean, sick: Boolean},
    date: Number,
    dirty: Number,
    health: Number,
    hunger: Number,
    love: Number,
    money: Number,
    stage: Number
  },
  name: String
});

User.plugin(findOrCreate);

mongoose.model('User', User);

if (nconf.get('NODE_ENV') === 'PRODUCTION') {
  mongoose.connect(nconf.get('dbconf'));
} else {
  mongoose.connect('mongodb://localhost/buddy');
}
