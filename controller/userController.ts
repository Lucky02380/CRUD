import Student from '../model/studentSchema.ts'
import crypto from 'crypto'
import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

import User from '../model/user.ts';
import Token from '../model/token.ts'

import dotenv from 'dotenv'
dotenv.config()

const algorithm = 'aes-256-cbc' //Using AES encryption
const key = process.env.key
const iv =  process.env.iv

// console.log(crypto.randomBytes(32))
// console.log(key)
//Encrypting text
// function encrypt(text) {
//    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
//    let encrypted = cipher.update(text);
//    encrypted = Buffer.concat([encrypted, cipher.final()]);
//    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// }

export const showUsers = (req:Request,res:Response) => {
    User.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            msg: "Error"
        })
    })
}

export const delUser = (req:Request,res:Response) => {
    let username = req.body.username
    User.findOneAndDelete({username : username})
    .then(response => {
        res.json({
            msg: "Student deleted"
        })
    })
    .catch(error => {
        res.json({
            msg: "Error"
        })
    })
}

export const singupUser = (request:Request , response: Response) => {
    try {
        console.log(request.body)
        // const hashedPassword = encrypt(request.body.password).encryptedData
        const hashedPassword = CryptoJS.AES.encrypt(request.body.password, key).toString();
        console.log(hashedPassword)
        const user = { username: request.body.username, password: hashedPassword }

        const newUser = new User(user);
        newUser.save();

        return response.status(200).json({ msg: 'Signup successfull' });
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: 'Error while signing up user' });
    }
}


export const loginUser = async (request:Request , response: Response) => {
    let user = await  User.findOne({ username: request.body.username });
    // console.log(user)
    console.log(user.password)
    console.log(user.username)
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let hassss = CryptoJS.AES.encrypt(request.body.password, key).toString();
        
        // console.log(user)
        console.log(user.password)
        console.log(hassss)

        var bytes  = CryptoJS.AES.decrypt(user.password, key);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log(originalText);
        
        let match =  (originalText === request.body.password)

        if (match) {
            // const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
            const newToken = new Token({ token: refreshToken });
            newToken.save();
            response.status(200).json({ refreshToken: refreshToken, username: user.username });
        
        } else {
            response.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        console.log(error)
        response.status(500).json({ msg: 'error while login the user' })
    }
}