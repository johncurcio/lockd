![LOCKD](_docs/logo.png)

Lockd is a slightly secure url shortener which allows you to protect your url with a lock number, making them effectively private. 

![demo-gif](_docs/demo.gif)

# Dependencies

## Backend

* Nginx - for url redirections and load balancing
* Express - Nodejs framework for building the RESTful API
* Mongodb - NoSQL database

## Frontend

* ReactJS - JavaScript library for building user interfaces.
* Semantic-UI - Responsive frontend framework for reactjs

# Using the project

1. Clone the project and install its dependencies:

```
$ git clone https://github.com/johncurcio/lockd.git
$ cd /client && npm install
$ cd /server && npm install
```

2. Install nginx and copy ``nginx.local.conf`` to conf folder.

3. Start the frontend and backend

```
$ cd /client && npm start
$ cd /server && npm start
```
