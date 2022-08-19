import { v2 as cloudinary } from 'cloudinary';
import dotenv  from "dotenv"
dotenv.config();

cloudinary.config({
  cloud_name: 'ssk777',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});


export default cloudinary