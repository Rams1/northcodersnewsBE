# nortcoders-news

A functioning API using MongoDB as the database, to give you the latest Northcoders news.

You can view the function API at https://northcoders-new1.herokuapp.com

## Getting Started

Fork and clone this repo onto your local drive and ensure Node.js is installed.

### Prerequisites

Once Node.js is installed run npm i to install all required files

### Installing

```sh
git clone https://github.com/{your-username}/northcodersnewsBE.git
npm i
```

## Running the tests

To run the tests run the following command

```sh
npm t
```

### Testing

The tests are to check that the endpoints are retrieving the correct data, and that the controllers are working correctly

```sh
describe('/api/comments', () => {
        it('PUT /api/comments/:comment_id?vote=up', () => {
            const votes = comments[0].votes
            return request
            .put(`/api/comments/${comments[0]._id}?vote=up`)
            .expect(200)
            .then(result => {
                expect(result.body.comment.votes).to.equal(votes + 1)
            })
        })
```

## Deployment

```sh
npm run dev
```

You should now be running on [localhost:9090](http://localhost:9090/)

## Built With

* [MongoDB](https://www.mongodb.com/) - The database.
* [Heroku](https://dashboard.heroku.com/) - The hosting website for the application.
* [MLAB](https://mlab.com/home) - The hosting website for the database.
* [Node](https://nodejs.org/en/) - The language used to write the app

## Author

** Ramsey Mahgoub ** - _work_ - [Rams1](https://github.com/Rams1)
