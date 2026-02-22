import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const ADMIN_EMAIL = 'rishabh.j.tripathi2903@gmail.com';

async function setAdmin() {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/algoforge';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        const User = mongoose.connection.collection('users');
        const result = await User.updateOne(
            { email: ADMIN_EMAIL },
            { $set: { role: 'admin' } }
        );

        if (result.matchedCount === 0) {
            console.log(`User with email ${ADMIN_EMAIL} not found. Please register first.`);
        } else {
            console.log(`✅ Admin role granted to ${ADMIN_EMAIL}`);
        }
    } catch (error) {
        console.error('Error setting admin:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

setAdmin();
