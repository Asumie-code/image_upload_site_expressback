require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const mongoUrl = process.env.MONGO_URL;
const port = process.env.SERVER_PORT || 5000;



mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => 
  console.log("Connection to Database established successfuly")
).catch(err => console.log(err));

mongoose.set('useFindAndModify', false);
const app = express();



app.use(cors());
app.use(helmet());




app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));
app.use(bodyParser.json({limit: '100mb'}));


app.use(router);


app.use('/assets/images', express.static('./img'));

app.use(function(err, req, res ,next) {
  console.log(err)
  res.status(500).json({message: 'internal app error'})
  next()
})


app.listen(port, () => {
    process.stdout.write("\033c");
    console.log(`app is running at port ${port}`);
  });
  
