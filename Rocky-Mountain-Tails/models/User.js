//WHAT I AM DOING:
//I will import this in my auth routes (coming next)
//I will use it to register and log in users
//When a user logs in, I will create a JWT token tied to their _id and role

//Imports first
import mongoose from "mongoose";
import bcrypt from "bcrypt"; //to hash passwords securely

//each user has a name, email, password, and role (walker or admin)
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "walker" },
});

//before saving a user, hash the password for security
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //only hash if password was changed
  this.password = await bcrypt.hash(this.password, 10); //secure password
  next();
});

//A method to compare password when logging in
userSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password); //true or false
};

const User = mongoose.model("User", userSchema);
export default User;

//You’ll import this in your auth routes (coming next)
//You’ll use it to register and log in users
//When a user logs in, we’ll create a JWT token tied to their _id and role
