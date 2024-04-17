const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  vitalSigns: [
    {
      temperature: { type: Number },
      heartRate: { type: Number },
      bloodPressure: { type: String },
      respiratoryRate: { type: Number },
    },
  ],
});



// salting and hashing the password
userSchema.pre("save", async function (next) {
  if (!isEmail(this.email)) {
    throw Error("Incorrect email address.");
  }

  if (this.password.length < 6) {
    throw Error("Incorrect password length. Minimum 6 characters.");
  }

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const isAuth = await bcrypt.compare(password, user.password);
    if (isAuth) {
      return user;
    }
    throw Error("Incorrect password");
  } else {
    throw Error("Incorrect email");
  }
};

const User = model("user", userSchema);

module.exports = User;
