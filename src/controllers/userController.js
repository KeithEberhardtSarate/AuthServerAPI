import { createUser } from '../src/services/userService.js';

async function createNewUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await createUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user.', erro: error.message });
  }
}

export { createNewUser };
