# Overview

I wrote a piece of software to interact with a MongoDB Database. The majority of the program is written with Angular, and has a server created with Express through JavaScript.

I wrote this to provide a place for users to create a list of their plants. They can determine if they are indoor or outdoor, different light and watering needs, and other descriptions to keep track of health or other information.

[Software Demo Video](https://youtu.be/vhjUrDBzXDY)

# Cloud Database

I am using a MongoDB database, through mongo commands with mongoose.

I have a table that contains rows for plants, with columns for names, care details, and descriptions. There is one table to contain all of the information.

# Development Environment

I developed this software with VSCode. I used the web version of MongoDB to create my initial table, and loaded the table using mongoose and mongo commands. 

I used Express libraries with Javascript to interact with my database. The UI of the application is written using Javascript, CSS, and HTML. 
# Useful Websites

- [MongoDB Docs](https://www.mongodb.com/docs/manual/tutorial/getting-started/)
- [W3 Schools](https://www.w3schools.com/mongodb/mongodb_get_started.php)
- [Free code camp](https://www.freecodecamp.org/news/learn-mongodb-a4ce205e7739/)

# Future Work

- I could add user authentication so the tables can be separate and have more than one user.
- I could make the UI better and more user friendly. The edit could open right under or in a new dialog box.
- I can send better warnings and validation to have the right input.