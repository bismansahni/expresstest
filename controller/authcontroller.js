import bcrypt from 'bcryptjs';
import User from '../models/user_model.js';  
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    
    

    
    const newUser = new User({
      username,
      email,
      password: password,
    });

    
    await newUser.save();

     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ message: 'User registered successfully',username:newUser.username,token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

















    


  









export const getRegisterMessage = (req, res) => {
  res.send("We are in register user");
};

export const getLoginMessage = (req, res) => {
  res.send("We are in login user");
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token ,username: user.username});
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};