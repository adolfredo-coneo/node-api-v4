import { comparePassword, generateToken, hashPassword } from '../modules/auth';
import prisma from '../modules/db';

export const createNewUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Invalid data' });
    }

    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};
