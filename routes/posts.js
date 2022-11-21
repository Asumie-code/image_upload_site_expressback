const express = require('express');
const router = express.Router();
const User = require('../Schems/user');
const fs = require('fs');
const formidable = require('formidable');
const imagesPath = `./img/`;








router.post('/gallery',  (req, res, next) => {

   console.log(req.query.user)
    const form = formidable({uploadDir: imagesPath, keepExtensions: true});
    form.parse(req , async (err, fields, files) => {
        if(err) {
            next(err);
            return;
        }



        try{
            await User.updateOne(
                { _id: req.query.user.id  },
                {
                    $push: {
                        posts: {
                            title: fields.title,
                            description: fields.description,
                            img: `${imagesPath}${files.img.path.slice(4)}`,
                        }
                    }
                }
            );
            res.status(201).json({message: 'post added'});
        } catch(e) {
            next(e)
        }


    })
   

});

router.get('/gallery', async (req, res, next) => {

   
    
    try {
        let user = await User.findOne({ _id: req.query.id   });
       if(user) {
           for (let index in user.posts) {
               user.posts[index] = {
                   id: user.posts[index]._id,
                   title: user.posts[index].title,
                   description: user.posts[index].description,
                   img: `http://localhost:5000/assets/images/${user.posts[index].img.slice(6)}`
               };
           }
       } else {
           return res.status(400).json({error: 'bad request'}); 
       }

       
        res.status(200).json(user.posts);
    } catch (e) {
        next(e)
    }



});




router.delete('/gallery', async (req, res, next) => {
    try {
        let user = await User.findOne(
            { _id: req.body.user.id },
        );

        let post = user.posts.id(req.body.id)
        fs.unlink(post.img, (err) => {
            if(err) throw err;
             
        });
        post.remove();
        await user.save();

        res.status(200).json({message: 'deleted'});
    } catch(e) {
        next(e)
    }
    

});






module.exports = router;

