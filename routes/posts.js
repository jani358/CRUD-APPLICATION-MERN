const express = require('express');
const posts = require('../models/posts');
const Posts = require('../models/posts');

// for http requsts
const router = express.Router();

//save posts
router.post('/post/save',(req,res)=>{
    let newPost = new Posts(req.body);
    newPost.save((err) =>{
        if(err){
            return res.status(400).json({
            });
        }
        return res.status(200).json({
            success:"Posts saved successfull"
        });
    });
});

//get posts
//router get is used for n points
router.get('/posts',(req,res)=>{
    //the find method is provided by mongoose for (find posts)
    Posts.find().exec((err,posts)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        //after we received our post without error
        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    });
});


//get a specific post
router.get("/post/:id",(req,res) =>{
    let postId = req.params.id;

    Posts.findById(postId,(err,post) =>{
        if(err){
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            post
        })
    });
});


//Update posts

router.put('/post/update/:id',(req,res)=>{
    Posts.findByIdAndUpdate(
        req.params.id,
        {
            //full body shoud be update here
            $set:req.body
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Succesfully"
            });
        }
    );
});

// delete post

router.delete('/post/delete/:id',(req,res)=>{
    Posts.findByIdAndRemove(req.params.id).exec((err,deletePost)=>{

        if(err) return res.status(400).json({
            message:"Delete unsuccesful",err
        });

        return res.json({
            message:"Delete succesfully",deletePost
        });
    });
});

module.exports = router;