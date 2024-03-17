// Importing required modules
const express = require('express');
const posts = require('../models/posts'); // Importing the posts model
const Posts = require('../models/posts');

// Creating an instance of Express router
const router = express.Router();

// Route to handle POST requests for saving a new post
router.post('/post/save', (req, res) => {
    // Creating a new post instance with data from request body
    let newPost = new Posts(req.body);

    // Saving the new post to the database
    newPost.save((err) => {
        if (err) {
            return res.status(400).json({}); // Responding with empty object if there's an error
        }
        return res.status(200).json({ // Responding with success message if post is saved successfully
            success: "Posts saved successfully"
        });
    });
});

// Route to handle GET requests for retrieving all posts
router.get('/posts', (req, res) => {
    // Finding all posts in the database
    Posts.find().exec((err, posts) => {
        if (err) {
            return res.status(400).json({
                error: err // Responding with error message if there's an error
            });
        }
        return res.status(200).json({ // Responding with all existing posts
            success: true,
            existingPosts: posts
        });
    });
});

// Route to handle GET requests for retrieving a specific post by ID
router.get("/post/:id", (req, res) => {
    let postId = req.params.id; // Extracting post ID from request parameters

    // Finding a post by its ID in the database
    Posts.findById(postId, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, err }); // Responding with error if post not found
        }

        return res.status(200).json({ // Responding with the specific post if found
            success: true,
            post
        });
    });
});

// Route to handle PUT requests for updating a post by ID
router.put('/post/update/:id', (req, res) => {
    // Updating a post by its ID with the data from request body
    Posts.findByIdAndUpdate(
        req.params.id,
        { $set: req.body }, // Updating post fields with new data
        (err, post) => {
            if (err) {
                return res.status(400).json({ error: err }); // Responding with error if update fails
            }

            return res.status(200).json({ // Responding with success message if update is successful
                success: "Updated Successfully"
            });
        }
    );
});

// Route to handle DELETE requests for deleting a post by ID
router.delete('/post/delete/:id', (req, res) => {
    // Deleting a post by its ID from the database
    Posts.findByIdAndRemove(req.params.id).exec((err, deletePost) => {
        if (err) {
            return res.status(400).json({
                message: "Delete unsuccessful", // Responding with error message if deletion fails
                err
            });
        }

        return res.json({ // Responding with success message and deleted post if deletion is successful
            message: "Delete successful",
            deletePost
        });
    });
});

// Exporting the router to be used in other parts of the application
module.exports = router;
