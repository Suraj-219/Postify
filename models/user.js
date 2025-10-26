const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log("MongoDB connected");
}).catch((err)=> {
    console.error('MongoDB connection error:', err.message);
});

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    }, 
     name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        miniLength: [3, 'Name must be at least 3 characters long'],
    },
    age: Number,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        miniLength: [13, 'Email must be at least 13 characters long'],
    password: {
        type: String,
        required: true,
        miniLength: [6, 'Password must be at least 6 characters long'],
        trim: true,
    },
    profilepic: {
        type: String,
        default: "default.jpg"
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId, ref: "post"
    }],
});

module.exports = mongoose.model('user', userSchema);
