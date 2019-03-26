### real time web app foundation
##### MCAD Advanced Web + Screen
---
The files contained here are the foundation of a one to many (and many to one) realtime web app.

We are using express.js to serve out our static HTML files and using socket.io to handle real-time communication and messaging Through this combination we can have realtime communication across many devices.

In this example we create an emoji sharer where when we click on a screen position, we replicate an emoji in that position on everyone's screen who is connected.


### deployment
+ coming soon



### common commands:
+ `pwd`: present working directory
+ `cd` : change directory : cd /Desktop
+ `ls` : list files
+ `ls -al` : list all files with info
+ `touch` : makes a new file : touch index.html
+ `mkdir` : make directory : mkdir my-directory-name
+ `ctrl + c` : to exit things


### commands to treat with respect (to be scared of):
+ `rm` : remove : rm /path/to/file * no warning!
+ `rm -rf` : remove directory : rm /path/to/directory * no warning!

+ `sudo`: super use do : do some command with root privileges * scary because it really do anything.


### node specific stuff:
+ `node -v` : what version of node am I using? / is it loaded?
+ `node` : run a node application : usually with a file path like: `node server.js`
+ `npm` : node package manager, install packages/plugins for node (other peoples code so we don't have to write as much)
+ `npm install --s package-name`
+ `npm init` : start a new node project and generate a package.json file

---
### To boot the server when you want to work
1. `cd` into your project directory
2. `node app.js` to use node to boot up your app.js file on the server
3. point your browser to `localhost:3000` and verify that everything is working

### Get started with this repo (for the first time)
1. download the .zip of, or `git clone` this project
1. `cd` into the downloaded project folder
1. run `npm install`
1. `node app.js`
1. gogogadget!

### Get started on your own without this repo by creating a new node.js project:
1. `mkdir` / make a new project folder
1. `cd` into the new project folder
1. `npm init`
1. Follow the prompts, but change `index.js` to `app.js` for later clarity
1. make an `app.js` file inside the project folder
1. make a `public` folder
1. inside the public folder, make `index.html`, `main.css`, etc.
1. install dependencies (`--save` will automatically add the dependencies in your `package.json` file)
    + `npm --save install socket.io` installs our web socket framework
    + `npm --save install express` installs our web server framework
1. checkout [the socket.io / express.js example](http://socket.io/docs/#using-with-express-3/4) to get started with these files
