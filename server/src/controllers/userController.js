import User from '../../models/User.js';

export const registerUser = async (req, res) => {
  const { fullName, username } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'Username already exists' });

    const newUser = await User.create({ fullName, username });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const loginUser = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

