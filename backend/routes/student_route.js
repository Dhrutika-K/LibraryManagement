const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../models/student");
const requireLogin = require("../middleware/auth")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


router.post("/signup", async (req, res) => {
    const { name, email, password, branch, roll_no, year, phone_no } = req.body;
    const isAdmin = false;

    console.log("Request body:", req.body);

    if (!name || !password || !email || !roll_no || !branch || !year || !phone_no) {
        console.log("Please add all the fields");
        return res.status(422).json({ error: "Please add all the fields" });
    }

    if(!email.endsWith('@iitdh.ac.in')){
        return res.status(422).json({error:"Invalid email"})
    }

    try {
        const savedUser = await Student.findOne({ roll_no });
        if (savedUser) {
            console.log("Student already exists with that roll no");
            return res.status(422).json({ error: "Student already exists with that roll no" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new Student({
            name,
            email,
            roll_no,
            branch,
            addmission_year: year,
            phone_no,
            password: hashedPassword,
            isAdmin
        });

        const newUser = await user.save();
        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);

        res.json({
            token,
            user: newUser
        });
    } catch (err) {
        console.log("Something went wrong:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
});


router.post("/signin", (req, res) => {
    console.log(req.body)
    const {password, roll_no,  type } = req.body;
    if (!roll_no || !password) {
        return res.status(422).json({ error: "please add roll_no and password" });
    }

    Student.findOne({ roll_no: roll_no }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid roll_no or password" });
        }
        if(type=="admin" && !savedUser.isAdmin)
            return res.status(422).json({error:"Invalid login"})
        if(type=="user" && savedUser.isAdmin)
            return res.status(422).json({error:"Invalid login"})
        bcrypt
            .compare(password, savedUser.password)
            .then((doMatch) => {
                if (doMatch) {
                    const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
                    
                    
                    res.json({
                        token,
                        user: savedUser
                    });
                } else {
                    return res.status(422).json({ error: "Invalid roll_no or password" });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
});

router.get("/profile", requireLogin, (req, res) => {
  
    Student.find({ _id: req.user._id })
    .select("-password")
    .then((admins) => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
    });
    });

router.get("/allStudent", (req, res) => {
    console.log("okk")
    Student.find().sort({ createdAt: -1 }).then(data => {
        res.status(200).json(
           data
        );
    });
});

router.post("/removeStudent" , async(req,res)=>{
   
    try {
       await Student.findOneAndDelete({ _id: req.body.postId }) ;
      
       res.send("you successfully remove the student")

    } catch (error) {
       console.log(error);
    }

  
})

module.exports = router;