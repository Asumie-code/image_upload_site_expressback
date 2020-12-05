const express = require('express');
const router = express.Router();

const about = [
    {
        title: 'When it is lunch time?',
        description: 'Some quick example text to build on the card title and make up the bulk of the card \'s content Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam reprehenderit optio rerum fugit nisi nesciunt earum, eos unde corrupti amet sequi dignissimos sunt perspiciatis repudiandae. Dolores nemo ipsum eos id. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa nam quae autem provident? Provident odio a excepturi unde maxime ut temporibus iste, totam nemo dolorum eius harum nesciunt animi quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ipsam autem suscipit voluptas laudantium excepturi nobis quidem ipsa, voluptatum quae nam veritatis porro ducimus eligendi maiores, et natus voluptate odio!'
    },
    {
        title: 'How do you feel about putting pineapple on pizza?',
        description: 'Some quick example text to build on the card title and make up the bulk of the card \'s content Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam reprehenderit optio rerum fugit nisi nesciunt earum, eos unde corrupti amet sequi dignissimos sunt perspiciatis repudiandae. Dolores nemo ipsum eos id. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa nam quae autem provident? Provident odio a excepturi unde maxime ut temporibus iste, totam nemo dolorum eius harum nesciunt animi quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ipsam autem suscipit voluptas laudantium excepturi nobis quidem ipsa, voluptatum quae nam veritatis porro ducimus eligendi maiores, et natus voluptate odio!'
    },
    {
        title: 'Digital Media',
        description: 'Some quick example text to build on the card title and make up the bulk of the card \'s content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam reprehenderit optio rerum fugit nisi nesciunt earum, eos unde corrupti amet sequi dignissimos sunt perspiciatis repudiandae. Dolores nemo ipsum eos id. '
    },
    {
        title: 'Digital Fart!!!',
        description: 'Some quick example text to build on the card title and make up the bulk of the card \'s content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam reprehenderit optio rerum fugit nisi nesciunt earum, eos unde corrupti amet sequi dignissimos sunt perspiciatis repudiandae. Dolores nemo ipsum eos id.'
    }
];




router.get('/about', (req, res) => {

    res.status(200).json(about);
})




module.exports = router;
