# CropCircle

This project is a full-stack React/MongoDB application that allows users to signup, login, logout, and then create a listing, view listings, update and delete listings (if author of the listing).

TO RUN THIS PROJECT:

1. Clone the repo
2. Create a .env file in the back directory and add the following:

DB_STRING=<your_mongo_uri>
PORT=4000
SECRET=<your-strong-password>

3. Run npm install in the back directory
4. Run npx nodemon server.js in the back directory to start the server
5. Run npm install in the front directory
6. Run npm start in the front directory to start the client
7. Register a user and then log in


-------------------------------------------------------------------------------------------------

Installed in this project are:

Installed back - express, cors, nodemon, dotenv, mongoose, multer (images), jsonwebtokens (for user sign up), bcrypt (masks password), validator (validates email and password built into mongoose)


Installed front - create-react-app, react-router-dom, sass,  

json package added: proxy = localhost:4000 so paths match


