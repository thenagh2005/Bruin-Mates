# Bruin-Mates

## GUIDE
Download the repo by doing git clone https://github.com/thenagh2005/Bruin-Mates.git
Open the project on your desired code editor, navigate to terminal and cd into the Bruin-Mates directory.
Now its time to set up the APIs.

## Cloudinary
Cloudinary allows users to upload and process image files by into the cloudinary database using a url. We use cloudinary for uploading profile pictures rather than storing images locally. 
First create an account at https://cloudinary.com/ and access your dashboard, which should list your "cloud name". There should be a button that says "Go to API Keys", which should list your API Key and API Secret.
After finding this information, add it to your .env file like so:

CLOUDINARY_CLOUD_NAME=\
CLOUDINARY_API_KEY=\
CLOUDINARY_API_SECRET=

## Backend
Run 'npm install' in the terminal in backend directory
Create a '.env' file
Create a MongoDB Atlas account and share your account details with Saatvik
Once you have the MongoDB Cluster connection url, add a variable called MONGO_CONNECTION_URL in your .env file and set it equal to your connection url. Make sure you replace the <db-password> field in the connection url with your actual password. Additionally, make sure to add a variable called JWT_SECRET to the .env file (not vital, but prevents the cookie errors).
Run nodemon app.js to start the server.
