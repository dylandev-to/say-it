const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      trim: true,
      max: 25
    },
    email: {
      type: String,
      trim: true,
      required: "Email is required",
      unique: "Email already exists",
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      lowercase: true
    },
    hashed_password: {
      type: String,
      required: "Password is required"
    },
    salt: String
  },
  { timestamps: true }
);

// Virtual field for password
UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Password field validation
UserSchema.path('hashed_password').validate(function() {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, null);

// Authentication methods
UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },
  toJSON: function () {
    const user = this.toObject();
    delete user.hashed_password;
    delete user.salt;
    return user;
  }
};

module.exports = mongoose.model('User', UserSchema, "Users");
