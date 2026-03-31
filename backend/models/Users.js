import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true
    },
  email: {
     type: String, 
     required: true, 
     unique: true 
    },
  password: { 
    type: String, 
    required: true 
    },
  user_type: { 
    type: String, 
    enum: ["Farmer", "Trader", "Admin"], 
    required: true 
    },
  is_verified: { 
    type: Boolean, 
    default: false 
    },
  verification_status: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], 
    default: null 
    },
  created_at: { 
    type: Date, 
    default: Date.now 
    }
});

const User = mongoose.model("User", userSchema);

export default User;
