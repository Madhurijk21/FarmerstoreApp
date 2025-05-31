import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://polamapp21:Polam$app21@cluster0.3eju1nc.mongodb.net/farmerdelivery').then(()=>console.log("DB Connected"));
}