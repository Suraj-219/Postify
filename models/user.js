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
    username: String,
    name: String,
    age: Number,
    email: String,
    password: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId, ref: "post"
    }],
});

module.exports = mongoose.model('user', userSchema);