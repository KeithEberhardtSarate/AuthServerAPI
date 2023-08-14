import { authenticateUser } from '../services/authService.js';

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const token = await authenticateUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ mensagem: 'Invalid credentials.', erro: error.message });
  }
}

export { login };