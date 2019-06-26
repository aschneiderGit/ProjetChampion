# How to install

- Make sure Node.js is installed on your computer
- Now with a node.js command line, you go into 'client' folder and type 'npm install'
- Same into 'server' folder
- Now type 'expo start' into the client folder
- and type 'npm start' into the server folder

# What is there now :

- Auth is not implemented for now so in the menu you can choose between a teacher and a student menu
- You can create forms in the teacher menu
- There‘s a working chat

# My phone is not recognized :

Try this in command line :

adb reverse tcp:3000 tcp:3000
