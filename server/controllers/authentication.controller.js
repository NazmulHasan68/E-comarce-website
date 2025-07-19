import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { sendOtp } from '../utills/OptSend.js';
import { generateToken } from '../utills/generateToken.js';

const generateOTP = () => String(Math.floor(100000 + Math.random() * 900000));

//register
export const register = async (req, res) => {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
        return res.status(400).json({ success: false, message: "Data is missing!" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ phone:phone });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists!" });
        }

        // Generate OTP and hash password
        const generatedOTP = generateOTP(); 
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Save user to database
        const user = new User({
            name,
            phone,
            otp: generatedOTP, 
            password: hashedPassword
        });

        await user.save();

        // Send OTP
        const otpResponse = await sendOtp(phone, generatedOTP); 
        
        // Check OTP response
        if (otpResponse && otpResponse.response_code === 202) {
            return res.status(201).json({ success: true, message: "User created successfully and OTP sent!" });
        } else {
            return res.status(500).json({ success: false, message: "OTP sending failed!", error: otpResponse });
        }
    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({ success: false, message: "Server error!", error: error.message });
    }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
    const { otp } = req.body;

    if (!otp) {
        return res.status(400).json({ success: false, message: "Please provide an OTP." });
    }

    try {
        const user = await User.findOne({ otp });

        if (!user) {
            return res.status(400).json({ success: false, message: "OTP is invalid or has expired." });
        }

        user.otp = undefined;
        user.isVerified = true;
        await user.save();
        generateToken(res, user);

        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.name}`,
            user,
        });

    } catch (error) {
        console.error("OTP Verification Error:", error);
        return res.status(500).json({ success: false, message: "Server error while verifying OTP" });
    }
};


// Login User
export const login = async (req, res) => {
    const { phone, password } = req.body;

    if (!phone || !password) {
        return res.status(400).json({ success: false, message: "phone or password is missing!" });
    }

    try {
        const user = await User.findOne({ phone: phone });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found!" });
        }

        // Compare passwords
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);  
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Password does not match!" });
        }

        // Generate JWT token
        generateToken(res, user, `Welcome back ${user.name}`)


        // Respond with success message
        return res.status(200).json({ 
            success: true, 
            message: "Login successful!", 
            user: { name: user.name, phone: user.phone }, 
        });
    } catch (error) {
        // Server error handling
        console.error("Error during login:", error);
        return res.status(500).json({ success: false, message: "Server error while logging in", error: error.message });
    }
};

// Logout User
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true });  
        return res.status(200).json({ success: true, message: "Logged out successfully!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error logging out", error });
    }
};

// Check Authentication and get profile
export const getUserProfile = async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ success: false, message: "Not authenticated!" });
        }

        // Verify and decode JWT token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // Find user by ID from the decoded token
        const user = await User.findById(decoded.userId)
            .populate('enrolledCourses')
            .populate('enrolledClass') 
            .populate('enrolledSubject')
            .select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        // Send only necessary user details
        return res.status(200).json({ 
            success: true, 
            message: "Authenticated", 
            user
        });

    } catch (error) {
        console.error("Error in getUserProfile:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token!" });
    }
};

//update token
export const updateProfile = async (req, res) => {
    const { token } = req.cookies;

    // Check if the user is authenticated
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authenticated!" });
    }

    const { name, phone, email, password, distric, photoUrl } = req.body;

    // If no data to update
    if (!name && !distric && !phone && !email && !password && !photoUrl) {
        return res.status(400).json({ success: false, message: "No data to update!" });
    }

    try {
        // Decode the token to get userId
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Find user by ID
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found!" });
        }

        // Update profile fields if provided
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (email) user.email = email;
        if (distric) user.distric = distric;
        if (password) {
            // Add logic to hash the new password before saving it
            user.password = await bcryptjs.hash(password, 10); 
        }
        if (photoUrl) user.photoUrl = photoUrl; 

        // Save the updated user profile
        await user.save();
        return res.status(200).json({ success: true, message: "Profile updated successfully!", user });
    } catch (error) {
        // Handle JWT errors, other potential errors
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ success: false, message: "Invalid or expired token!" });
        }
        return res.status(500).json({ success: false, message: "Error updating profile", error: error.message });
    }
};


// Forget Password Controller
export const forgetPassword = async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ success: false, message: "Phone number is required!" });
        }

        // Check if user exists
        const user = await User.findOne({ phone:phone });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        // Generate OTP and store it in the user document
        const generatedOTP = generateOTP();
        user.otp = generatedOTP;
        await user.save(); 

        // Send OTP via SMS
        const otpResponse = await sendOtp(phone, generatedOTP);

        if (otpResponse.status === "success" || otpResponse.success_message) {
            return res.status(200).json({ success: true, message: "OTP sent successfully!" });
        } else {
            return res.status(500).json({ success: false, message: "Failed to send OTP!", error: otpResponse });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
};


// Verify OTP
export const passwordVerifyCode = async (req, res) => {
    const { otp} = req.body;

    if (!otp) {
        return res.status(400).json({ success: false, message: "Please provide email and OTP" });
    }

    try {
        const user = await User.findOne({ otp });

        if (!user.otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP " });
        }

        user.otp = undefined;
        await user.save();

        const data = generateToken(res, user, `Welcome back ${user.name}`)

        return res.status(200).json({success:true, data})

    } catch (error) {
        console.error("OTP verification error:", error);
        return res.status(500).json({ success: false, message: "Server error while verifying OTP", error: error.message });
    }
};


//reset password 
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.cookies;
        const { password } = req.body;

        if (!token) {
            return res.status(401).json({ success: false, message: "Not authenticated!" });
        }

        // Decode JWT token and verify it
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Find user from decoded token
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        // Hash new password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ success: true, message: "Password reset successfully!" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error during password reset", error: error.message });
    }
};







//get all the student
export const getallthestudent = async(req, res)=>{
    try {
        const student = await User.find({})
        return res.status(200).json({student})
    } catch (error) {
        return res.status(500).json({ success: false, message: "All student get", error: error.message });
    }
}


