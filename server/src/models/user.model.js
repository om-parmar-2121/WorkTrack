import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["HR", "Employee"],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "active", "rejected"],
      default: "pending",
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
    
  },
  {
    timestamps: true, // creates createdAt & updatedAt automatically
  },
);

const User = mongoose.model("User", userSchema);
export default User;
