import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});


const token = mongoose.model('token', TokenSchema);

export default token;