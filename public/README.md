# Northcoder News

Create a reddit style clone api for northcoders.

## Getting Started

I will be building the API which to use in the Northcoders News Sprint during the Front End block of the course.

My database will be MongoDB. 

### Prerequisites

MongoDB will need to be installed as well as the following npm packages:
express 
mongoose 
supertest
body-parser
ejs
lodash
faker
mocha
chai
nodemon

```
# Please find below some methods for mongo to be used in your queries
* [find](http://mongoosejs.com/docs/api.html#model_Model.find)
* [findOne](http://mongoosejs.com/docs/api.html#model_Model.findOne)
* [findOneAndUpdate](http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate)
* [findOneAndRemove](http://mongoosejs.com/docs/api.html#model_Model.findOneAndRemove)
* [findById](http://mongoosejs.com/docs/api.html#model_Model.findById)
* [findByIdAndUpdate](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate)
* [findByIdAndRemove](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove)
* [update](http://mongoosejs.com/docs/api.html#model_Model.update)

There are also some methods that can be called on the documents that get returned. These are:

* [remove](http://mongoosejs.com/docs/api.html#model_Model-remove)
* [save](http://mongoosejs.com/docs/api.html#model_Model-save)
* [count](http://mongoosejs.com/docs/api.html#model_Model.count)
```

### Step 1 - Seeding

  When seeding the database, you must consider both environments you will be working in, both test and development. Switching from each can be done within a config file and setting your process.env.NODE_ENV to which ever your environment you want to run.
   This can be done with a dev seed file which calls a function in your seed file with the required arguments.
   MAKE sure your mongoDB is running so that you can seed it. You can do this my typing mongod into the console
   .

1.  You will need to seed the topics, followed by the articles and the users. Each article should belong to a topic, referenced by a topic's \_id property. Each article should also have a random number of comments. Each comment should have been created by a random user (referenced by their \_id property) and should also belong to a specific article (referenced by its \_id property too). Use a library such as [faker](https://www.npmjs.com/package/faker) or [chance](https://www.npmjs.com/package/chance) to generate random comments.   


End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc