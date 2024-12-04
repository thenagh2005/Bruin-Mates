# **Table of Contents**

1. [Bruin-Mates](#bruin-mates)
2. [Guide](#guide)
   - [Frontend Setup](#frontend-setup)
   - [Backend Setup](#backend-setup)
     - [MongoDB Atlas](#mongodb-atlas)
     - [JWT_SECRET](#jwt_secret)
     - [Cloudinary](#cloudinary)
     - [Running Backend](#running-backend)
3. [Technology](#technology)

# Bruin-Mates
Bruin-Mates is a web application designed to help UCLA students find suitable roommates based on shared preferences.

# GUIDE

Download the repo by doing git clone https://github.com/thenagh2005/Bruin-Mates.git  
Open the project on your desired code editor, navigate to terminal and type ```cd Bruin-Mates```.  

## Frontend setup
Navigate to the frontend directory:  
```cd frontend```  

Install the required depndencies:  
```npm install```   

Start the React development server:  
```npm start```  

This will start the frontend on http://localhost:3000.

## Backend setup
Navigate to the backend directory:  
```cd backend```   

Install the required dependencies:  
```npm install```   

Create a ```.env``` file

### MongoDB Atlas
Create a [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) account and share your account details with Saatvik.  

Once you have the MongoDB Cluster connection url, add a variable called ```MONGO_CONNECTION_URL``` in your ```.env``` file and set it equal to your connection url. Your ```.env``` should look like this:  
```MONGO_CONNECTION_URL=<your-connection-url>```

NOTE: Make sure you replace the ```<db-password>``` field in the connection url with your actual password. 

### JWT_SECRET
Additionally, make sure to add a variable called ```JWT_SECRET``` to the ```.env``` file (not vital, but prevents the cookie errors). It can have any string as its value like so:   
```JWT_SECRET=<your-string>```

### Cloudinary
Cloudinary allows users to upload and process image files by into the cloudinary database using a url. We use cloudinary for uploading profile pictures rather than storing images locally. 
First create an account at https://cloudinary.com/ and access your dashboard, which should list your "cloud name". There should be a button that says "Go to API Keys", which should list your API Key and API Secret.
After finding this information, add it to your .env file like so:

```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Running Backend
Run ```nodemon app.js``` in your terminal to start the server on http://localhost:4000.

# Technology
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Cloudinary**: For image uploads