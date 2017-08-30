const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models');
const BlogPost = require('./models1');
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());

server.post('/users', (req,res) => {
	
	const {firstName, lastName, email} = req.body; 

     if (!firstName || !lastName || !email) {
        res.status(422);
        res.json('missing text or complieted field');
     return;
     }

     //const bear = new Bear({species, latinName});
     const user = new User(req.body);

    //  bearTypes.save((err) => {
    //      if (err) throw err;
    //      res.json(todo);
    //  });
   user.save((err, savedUser)=>{
     if (err) {
       res.status(500).json({ success: false, message: 'could not save the bear'});
     } else {
       res.status(201).json(savedUser);
     }
   });

});

server.get('/users', (req, res) => {
	User.find({}, (err, data) => {
        if(err) throw err;
        res.json(data);
  });
      
// ext Bear.find({/bears})

});


server.get('/users/:id', (req, res) => {
	const { id } = req.params; //? query string

	User.findById(id, (err, user) => {
        if (err) throw err;
          res.json(user);
	});
});


server.delete('/users/:id',(req, res) => {
    const { id } = req.params;

    User.findByIdAndRemove(id, (err, user) => {
        if (err) throw err;
        //  User.remove(id).exec();
        //  User.find({id}).remove().exec();
          res.json({ success: true, message: 'id successfully deleted'});
	});

});


// TODO: write your server code here

// Blog Post GET, POST, and DELETE

server.post('/blogposts', (req,res) => {
	
	const {blogPostTitle, blogPostContent} = req.body; 

     if (!blogPostTitle || !blogPostContent) {
        res.status(422);
        res.json('missing text or complieted field');
     return;
     }

     //const bear = new Bear({species, latinName});
     const blogPost = new BlogPost(req.body);

    //  bearTypes.save((err) => {
    //      if (err) throw err;
    //      res.json(todo);
    //  });
   blogPost.save((err, savedBlogPost)=>{
     if (err) {
       res.status(500).json({ success: false, message: 'could not save the bear'});
     } else {
       res.status(201).json(savedBlogPost);
     }
   });

});

server.get('/blogposts', (req, res) => {
	BlogPost.find({}, (err, data) => {
        if(err) throw err;
        res.json(data);
  });
      
// ext Bear.find({/bears})

});


server.get('/blogposts/:id', (req, res) => {
	const { id } = req.params; //? query string

	BlogPost.findById(id, (err, user) => {
        if (err) throw err;
          res.json(user);
	});
});


server.delete('/blogposts/:id',(req, res) => {
    const { id } = req.params;

    BlogPost.findByIdAndRemove(id, (err, user) => {
        if (err) throw err;
        //  User.remove(id).exec();
        //  User.find({id}).remove().exec();
          res.json({ success: true, message: 'id successfully deleted'});
	});

});





 mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/',
  { useMongoClient: true }
);

// const connect1 = mongoose.connect(
//   'mongodb://localhost/blogposts',
//   { useMongoClient: true }
// );



/* eslint no-console: 0 */
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});
