const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require("./models/post");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "secret";

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.get('/profile', isLoggedIn, async (req,res) => {
    let user = await userModel.findOne({email: req.user.email}).populate("posts");
    res.render("profile", {user});
});

app.post('/post', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    let {content} = req.body;

    if(!content) return res.status(400).send('Post content is required');

    let post = await postModel.create({
        user: user._id,
        content
    });

    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
});

app.post('/register', async (req, res)=> {
    let {username, name, age, email, password} = req.body;
    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User already register");

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, async (err, hash)=> {
            let user = await userModel.create({
                username,
                name,
                age,
                email,
                password: hash
            });

            let token = jwt.sign({email: email, userid: user._id}, JWT_SECRET);
            res.cookie("token", token);
            res.send("registered");
        })
    })
});

app.post('/login', async (req, res) => {
    let {email, password} = req.body;

    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something went wrong");

    bcrypt.compare(password, user.password, (err, result)=>{
        if(result) {
            let token = jwt.sign({email: email, userid: user._id}, JWT_SECRET);
            res.cookie("token", token);
            res.status(200).redirect("/profile");
        }
        else res.redirect("/login");
    })
});

app.get('/logout', (req, res) => {
    res.cookie("token", "");
    res.redirect("/login");
});

function isLoggedIn(req, res, next){
    const token = req.cookies && req.cookies.token;
    if(!token) return res.redirect('/login');

    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();
    }catch(err){
        res.clearCookie('token');
        return res.redirect('/login');
    }
}

module.exports = app;