# Bruin-Mates

## GUIDE
Download the repo by doing git clone https://github.com/thenagh2005/Bruin-Mates.git
Open the project on your desired code editor, navigate to terminal and cd into the Bruin-Mates directory.
Now its time to set up the APIs.

## Cloudinary
Cloudinary allows users to upload and process image files by into the cloudinary database using a url. We use cloudinary for uploading profile pictures.
To avoid locally storing image files, we will utilize Cloudinary keys to process them. 
First make an account at https://cloudinary.com/ and access dashboard to find your personal API keys. Your .env file should have this:

cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET

## Backend
Run 'npm install' in the terminal in backend directory
Create a '.env' file
Create a MongoDB Atlas account and share your account details with Saatvik
Once you have the MongoDB Cluster connection url, add a variable called MONGO_CONNECTION_URL in your .env file and set it equal to your connection url. Make sure you replace the <db-password> field in the connection url with your actual password. Additionally, make sure to add a variable called JWT_SECRET to the .env file (not vital, but prevents the cookie errors).
Run nodemon app.js to start the server.
