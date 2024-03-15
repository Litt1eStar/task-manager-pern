import bcrypt from 'bcryptjs';
import pool from '../../db.js';
import jwt from 'jsonwebtoken'

export const signup = async(req, res) => {    
    const { username, password, email } = req.body;

    const existed = await pool.query("SELECT email FROM users WHERE email=$1", [email]);

    if(existed.rows[0]){
        return res.status(500).json({error: "Can't Sign Up Because of This email already in database"})
    }
    
    const hashPassword = await bcrypt.hash(password, 10);

    await pool.query("INSERT INTO users(username, password, email, createdAt)VALUES($1,$2,$3, NOW())",[username, hashPassword, email], (error, results)=>{
        if(error){
            return res.status(400).json({error: error.message})
        }

        return res.status(200).json("Succesfully Create User in Database | Go To Login Page");
    });
}

export const signin = async(req, res) => {
    const {username, password, email} = req.body;

    if(!username || !password || !email) {
        return res.status(500).json({error: "User Credential in not Complete"});
    }

    const existed = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    const user = existed.rows[0];

    if(!user){
        return res.status(500).json({error: "User not Found | Please go Sign Up First"})
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        return res.status(401).json({error: "User Credentail is Invalid"});
    }
    
    const dataToSend = {...user};
    delete dataToSend.password;

    const token = jwt.sign(dataToSend, process.env.SECRET);
    
    res.cookie("token", token)
    res.status(200).json(token);
}