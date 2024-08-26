import 'dotenv/config'; 
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './middleware.js';
import { User } from '../models/userModel.js'; // Assuming 'User' is the default export

const router = express.Router();

// ----------------------------------------------------------------------------
// const authHeader = req.headers['authorization'];

// axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/protected-endpoint`, {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// })
// ------ ----------------------------------------------------------------------

router.post('/register', async (req, res) => {
  console.log('in register');
  
  const { username, phone, password } = req.body;

  if (!username || !phone || !password) {
    return res.status(400).json({ message: "Please enter all details" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        phone,
        password: hashedPassword
        });
    
    const savedUser = await user.save();

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
        expiresIn: '4h' 
    });  

    res.status(201).json({ token, userId: savedUser._id });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.post('/login',async (req,res)=>{
    const {phone, password} = req.body;
    if (!phone || !password) {
        return res.status(400).json({ message: "Please enter all details" });
    }

    try {
        const user = await User.findOne({ phone });
        console.log(user);
        if (!user) {
          return res.status(400).json({ message: "user not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '4h'
        });
        console.log(process.env.JWT_SECRET);

        res.status(200).json({ token, userId: user._id });
        
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:userId', authMiddleware, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  console.log("genwin");
  const {userId} = req.params;

  const user = User.findOne({_id: userId})
    .then(user => {
      const userData = {
        username: user.username,
        phone: user.phone 
      }
      res.status(200).send(userData);
    })
    .catch(err=> {
      res.status(500).send({messege: 'cant find you'});
      console.log(err);
    })
  
  
  
})



export default router;
