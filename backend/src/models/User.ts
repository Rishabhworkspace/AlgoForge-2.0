import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false // Optional for Google Auth users
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    avatar: {
        type: String
    },
    xp_points: {
        type: Number,
        default: 0
    },
    streak_days: {
        type: Number,
        default: 0
    },
    last_active: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

import bcrypt from 'bcryptjs';

interface IUser extends mongoose.Document {
    password?: string;
    isModified: (path: string) => boolean;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}

// Methods must be added to schema before compiling the model
userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    const user = this as any; // Temporary to bypass strict types for mongoose hooks
    if (!user.isModified('password')) {
        return next();
    }
    if (!user.password) return next();

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;
