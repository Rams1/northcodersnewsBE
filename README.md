# Northcoder News Api

A simple api app that serves up information from a mongoDB.


## Getting Started

The following npm packages are required:
```
npm install -D
```
express,
mongoose,
chai,
mocha,
nodemon,
ejs,
supertest


### Setup

Please create a config file containing the following files;

```
development.js
```

this file will contain the url to your development database within mongo eg.
mongodb://localhost:27017/devData. Please make sure youre exporting this url as a string from this file.

```
test.js
```
This file will contain a string url to your test database eg mongodb://localhost:27017/devData_test .. again make sure you are using module.exports to export the string.

```
index.js
```
This file will contain a constant path which will set path to either the value of the process.env.NODE_ENV key or the string, development.
 module.exports must be used to require in the file path and immidiately export it, the path will be a template literal using the constant declared at the start  .eg

```
module.exports = require(`./${path}`)
```

```
production.js
``` 
This file will contain your url to the mlab database you need to set up.
again, make sure you module.exports the url.

```
app setup;
```
everything is now ready to go regarding the app. now we have to setup  the mlab database and the heroku app.


```
MLAB Setup
```

## follow the documention below to help setup your mlab database 

```
https://docs.mlab.com/
```
```
Hosting on Heroku
````
next we have to join heroku, where we can deploy the api;

### Sign up to heroku @ heroku.com 

Once you have an account and have linked it to your github account, you are ready to deploy onto heroku.

```
npm run prod-dev 
```
This command will seed your mlab database.

```
install Heroku npm package
```
Follow the link to set up heroku in node.js
```
https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up
```




```
Deploying api onto Heroku
```

## Deployment

Now that heroku has been linked to your github if you git commit and push to github, heroku can access this new version..

follow the link below to deploy in heroku

```
https://devcenter.heroku.com/articles/git#prerequisites-install-git-and-the-heroku-cli
```

## Acknowledgments

* Thanks to northcoders
* Mike
* Henry
* Nick

##  Link to Heroku Hosted app

```
https://northcoders-news1.herokuapp.com/
```