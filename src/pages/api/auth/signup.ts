// pages/api/auth/signup.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../../utils/authUtils';
import { users } from './login';

// Example of a user model
interface User {
  id: number;
  username: string;
  email: string,
  passwordHash: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, password, email } = req.body;

  // Check if the username is already taken
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: 'Username is already taken' });
  }

  // Hash the password
  const passwordHash = await hashPassword(password);

  // Save the user to the database (replace with your database integration)
  const newUser: User = {
    id: users.length + 1,
    username,
    email,
    passwordHash
  };
  console.log("New-User", newUser)
  users.push(newUser);

  res.status(201).json({ message: 'User created successfully' });
}
