/*
const express=require('express')
const { body, validationResult } = require('express-validator');
const User=require('../model/User.js')
const router=express.Router()
var bcrypt=require('bcryptjs')
var jwt=require("jsonwebtoken")
var fetchuser=require("../middleware/fetchuser")

const JWT_SECRET="akashisavrygood$boy"

//Route 1:create a User using: POST "/api/auth/createuser" . No login required
router.post('/createuser',[
    body('name','enter e valid name').isLength({ min: 3 }),
    body('Email','enter a valid Email').isEmail(),
    body('password','enter a valid password').isLength({ min: 5 }),
],async (req,res)=>{
    //if error occurs then it return bad request and error(which is send as response)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    //check whether the user with Email already exit or not
      let user=await User.findOne({Email: req.body.Email})
      if(user){
        res.json({error:"user already exit with this Email already exists"})
      }
      const salt=await bcrypt.genSalt(10);
      const secpass=await bcrypt.hash(req.body.password,salt);
      user=await User.create({
        name: req.body.name,
        password: secpass,
        Email: req.body.Email
    })
    const data={
      user:{
        id: User.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET)
    //console.log(authtoken)
    res.json({Authentication_token:authtoken})
  // .then(user => res.json(user)).
  // catch(err=>{ console.log(err)
  // res.json({error:"please enter a unique value of Email",message: err.message})}
  // )
})

//Route 2: create a User using: POST "/api/auth/login" . No login required
router.post('/login',[
  body('Email','enter a valid Email').isEmail(),
  body('password','password cannot be blank').exists()
],async (req,res)=>{

  //if error occurs then it return bad request and error(which is send as response)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const {Email,password}=req.body;
  try{
    let user=await User.findOne({Email})
    if(!user){
      return res.status(400).json({error:"Please try to login with correct credential"})
    }
    const passwordCompare=await bcrypt.compare(password,user.password)
    if(!passwordCompare){
      return res.status(400).json({error:"Please try to login with correct credential"})
    }
    const data={
      User:{
        id: user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET)
    res.json({Authentication_token:authtoken})
  }
  catch(error){
    console.error(error.message)
    res.status(400).send("Internal server Error")
  }
})

//Route 3: Get loggedin  User details using: POST "/api/auth/getuser" .login required
router.post('/getuser',fetchuser,async (req,res)=>{
  try{
    const userId=req.User.id;
    const user=await User.findById(userId).select("-password")
    res.send(user)
  }catch(error){
    console.error(error.message)
    res.status(500).send("Internel server error")
  }
})

module.exports=router
*/

const express = require('express');
const User = require('../model/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagoodb$oy';

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('Email', 'Enter a valid Email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success=false
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success ,errors: errors.array() });
  }
  try {
    // Check whether the user with this Email exists already
    let user = await User.findOne({ Email: req.body.Email });
    if (user) {
      return res.status(400).json({success ,error: "Sorry a user with this Email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      Email: req.body.Email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);


    // res.json(user)
    success=true
    res.json({success ,authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('Email', 'Enter a valid Email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { Email, password } = req.body;
  try {
    let user = await User.findOne({ Email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router