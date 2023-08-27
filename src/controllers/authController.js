import { authenticateUser } from '../services/authService.js';

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const token = await authenticateUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials.', erro: error.message });
  }
}

async function loginBasic(req, res) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ message: 'Basic authentication required.' });
    }

    const encodedCredentials = authHeader.replace('Basic ', '');
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
    const [email, password] = decodedCredentials.split(':');

    const token = await authenticateUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials.', errorr: error.message });
  }
}

export { login, loginBasic };
