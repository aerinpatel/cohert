const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
// brcypt, zod, jsonwebtoken
const  { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");
const {z} = require('zod');
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const hashrounds = 4;

// app.use(cookieParser());
const mySchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

adminRouter.post("/signup", async function(req, res) {
    const { email, password} = req.body; // TODO: adding zod validation
    // TODO: hash the password so plaintext pw is not stored in the DB
    const response = mySchema.safeParse({
        email: email,
        password: password
    });
    if(response.success === false) {
        res.status(400).json({
            message: "Invalid email or password"
        });
        return;
    }
    const hashedPassword = await bcrypt.hash(password, hashrounds);
    // TODO: Put inside a try catch block
    console.log("email: ", email);
    console.log("password: ", password);
    console.log("hash_password: ",hashedPassword);
    try{
        await adminModel.create({
            email: email,
            password: hashedPassword,

        });
    }catch(e) {
        console.log(e);
    }
    
    res.json({
        message: "Signup succeeded"
    });
});

adminRouter.post("/signin", async function(req, res) {
    const { email, password } = req.body;
    
    // TODO: ideally password should be hashed, and hence you cant compare the user provided password and the database password
    
    const response = mySchema.safeParse({
        email: email,
        password: password
    });
    if(response.success === false) {
        res.status(400).json({
            message: "Invalid email or password"
        });
        return;
    }
    console.log("email: ", email);
    console.log("password: ", password);
    // console.log("new_pass: ", new_pass);
    const admin = await adminModel.findOne({
        email: email,
        // password: new_pass
    });
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
        res.status(403).json({
            message: "Incorrect credentials"
        });
        return;
    }
    if (admin) {
        const token = jwt.sign({
            id: admin._id,
            // signingTime: Date.now(),
            // expiryTime: Date.now() + 0.1 * 60 * 60 // 0.1 hours
        }, JWT_ADMIN_PASSWORD);

        // Do cookie logic

        res.json({
            token: token
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }
});

adminRouter.post("/course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    // creating a web3 saas in 6 hours
    const course = await courseModel.create({
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price, 
        creatorId: adminId
    });

    res.json({
        message: "Course created",
        courseId: course._id
    });
});

adminRouter.put("/course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    // creating a web3 saas in 6 hours
    const course = await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    });

    res.json({
        message: "Course updated",
        courseId: course._id
    });
});

adminRouter.get("/course/bulk", adminMiddleware,async function(req, res) {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    });
});

module.exports = {
    adminRouter: adminRouter
}