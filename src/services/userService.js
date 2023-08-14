import User from '../models/User.js';

async function createUser(name, email, password) {
  const newUSer = new User({
    name,
    email,
    password,
  });
  await newUSer.save();
  return newUSer;
}

export { createUser };
