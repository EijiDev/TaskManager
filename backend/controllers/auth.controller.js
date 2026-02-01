import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../model/users.model.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Email and password are required" 
            });
        }

        const findUser = await Users.findUserByEmail(email);

        console.log("findUser:", findUser); 

        if (!findUser) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        const match = await bcrypt.compare(password, findUser.password);
        
        if (!match) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        // Generate token
        const accessToken = jwt.sign(
            { 
                userId: findUser.id,      
                email: findUser.email 
            },
            process.env.JWT_SECRET,
            { expiresIn: '15m' } 
        );

        // Generate refresh token
        const refreshToken = jwt.sign(
            { userId: findUser.id },       
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        await Users.updateRefreshToken(findUser.id, refreshToken);

        // Set httpOnly cookie for refresh token
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ 
            success: true,
            message: "Login successful",
            accessToken,
            user: {
                id: findUser.id,            
                email: findUser.email,
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ 
            success: false,
            message: "An error occurred during login" 
        });
    }
};