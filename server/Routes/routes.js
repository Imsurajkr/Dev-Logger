var express = require('express'),
    router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


router.get('/', function(req,res,next){
  res.send('Hello from Server');
});


router.get('/dashboard/project',function(req,res,next){
  var resultArray = [];
  MongoClient.connect(url, function(err,db) {
    if (err) throw err;
    var dbo = db.db('DevLogger');
    dbo.collection("projects").aggregate([
      {$lookup:
        {
          from: 'posts',
          localField: 'p_name',
          foreignField: 'p_name',
          as: 'postdetails'
        }
      }
    ]).toArray(function(err, result) {
      console.log(result);
      res.send(result)
    });
    db.close();
  });
});

// router.get('/dashboard/posts',function(req,res,next){
//   var resultArray = [];
//   MongoClient.connect(url, function(err,db) {
//     if (err) throw err;
//     var dbo = db.db('DevLogger');
//     dbo.collection("projects").find().toArray(function(err, result) {
//       console.log(result);
//       res.send(result)
//     });
//     db.close();
//   });
// });

// router.get('/dashboard/new',function(req,res,next){
//   var resultArray = [];
//   MongoClient.connect(url, function(err,db) {
//     if (err) throw err;
//     var dbo = db.db('DevLogger');
//     dbo.collection("posts").find().toArray(function(err, result) {
//       console.log(result);
//       console.log(result[0])
//       console.log(result[0].name)
//       res.send(result)
//     });
//     db.close();
//   });
// });

// router.post('/enroll',function(req,res,next){
//   console.log(req.body);
//   res.status(200).send({'message': 'Data Received'});
//   var data = {
//     name : req.body.name,
//     password: req.body.password
//   };
//   console.log(data);
//   MongoClient.connect(url, function(err,db) {
//     if (err) throw err;
//     var dbo = db.db('DevLogger');
//     dbo.collection("user").insertOne(data, function(err,res){
//       if (err) throw err;
//       console.log("Collection created Documents inserted.." + res.insertedCount);
//       db.close();
//     });
//   });
// });

module.exports = router;
