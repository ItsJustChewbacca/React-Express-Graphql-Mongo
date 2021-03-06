# React-Apollo-Express-Mongoose-mLab-Graphql
#### Built this project to gain more knowledge and practice with graphql along with React

## Tech Stack
```
Server Side
   "cors": "^2.8.5",
    "express": "^4.16.4",
    "express-graphql": "^0.7.1",
    "graphql": "^14.0.2",
    "lodash": "^4.17.11",
    "mongoose": "^5.3.10"
```
```
Client Side
    "apollo-boost": "^0.1.20",
    "graphql": "^14.0.2",
    "react": "^16.6.1",
    "react-apollo": "^2.2.4",
    "react-dom": "^16.6.1",
    "react-scripts": "2.1.1"
```

### Getting Started

```
- Clone repo
- Run `Npm Install --save` in both the server file and client file
-`npm install nodemon -g` if you haven't already
- Create Mlab account for mongo instance
- Grab mLab credentials and replace:

mongoose.connect('mongodb://username:password@ds121192.mlab.com:21192/gql');

Within server/app.js with your mLab db username and pass
- Run `nodemon app` to start server app (listening on port 4000)
-Navigate to `localhost:3000/graphql to open Graphiql
- Run `Npm start` within the client folder to start React client side application (listening on port 3000)

Enjoy!!
```

### Project
```
App
```
!['App Client side'](https://github.com/ItsJustChewbacca/React-Express-Graphql-Mongo/blob/master/client/public/App.jpg?raw=true)

```
Creating Book
```
!['Creating Book'](https://github.com/ItsJustChewbacca/React-Express-Graphql-Mongo/blob/master/client/public/MakingBook.jpg?raw=true)

```
Book Created
```
!['Book Created'](https://github.com/ItsJustChewbacca/React-Express-Graphql-Mongo/blob/master/client/public/BookMade.jpg?raw=true)

```
Server side Application query using Graphiql
```
!['Server Side App'](https://github.com/ItsJustChewbacca/React-Express-Graphql-Mongo/blob/master/client/public/Graphiql.jpg?raw=true)

```
mLab Db
```
!['mLab'](https://github.com/ItsJustChewbacca/React-Express-Graphql-Mongo/blob/master/client/public/mLab2.jpg?raw=true)


