import { NextApiRequest, NextApiResponse } from 'next';
import { comparePasswords } from '../../../utils/authUtils';
import { generateToken } from '../../../utils/authUtils';

// Example of User Type
type User = {
  id: number,
  username: string,
  email: string,
  passwordHash: string
}

// Get user from database (replace with your database integration)
export const users: User[] = [
  { id: 1, username: 'user1', passwordHash: 'hashedPassword1', email: 'test@gmail.com' },
  { id: 2, username: 'user2', passwordHash: 'hashedPassword2', email: 'test1@gmail.com' }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { password, email } = req.body;

  // Find the user by username
  const user = users.find((u) => u.email == email)!;

  if (!user) {
    return res.status(401).json({ message: 'Invalid email' });
  }

  // Compare passwords
  const passwordMatch = await comparePasswords(password, user.passwordHash);
  console.log(passwordMatch, passwordMatch)

  // const passwordMatch = password === user.passwordHash

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Generate JWT token
  const token = generateToken({ id: user.id, email: user.email });
  console.log(token)

  res.status(200).json({ token });
}
