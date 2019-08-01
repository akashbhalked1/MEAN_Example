const express = require('express');
const app=express();
const port=3005;
const mongoose=require('mongoose');
var bodyParser = require('body-parser');
const personModel=require('./person-model');

mongoose.connect('mongodb://localhost/test',{useNewUrlParser:'true'});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/add',(req,res)=>{
var person=req.body;
var pobj=new personModel(person);
pobj.save();
res.end(JSON.stringify({status:'Added Successfully'}));  
})

app.get('/',(req,res)=>{
personModel.find({},function(err,data){
    if(err)
    res.end(JSON.stringify(err));
    res.end(JSON.stringify(data));
})

app.post('/delete',(req,res)=>{
    var id=req.body.id;
    personModel.deleteOne({'_id':id},function(err){
        if(err)
        res.end(JSON.stringify(err));
        personModel.find({},function(err,data){
            if(err)
            res.end(JSON.stringify(err));
            res.end(JSON.stringify(data));
        })
    })
    
})

app.post('/update',(req,res)=>{
    var person=new personModel({
        'name':req.body.name,
        'addr':req.body.addr
    });
    var upsertData = person.toObject();
    delete upsertData._id;
    personModel.updateOne({_id: req.body._id}, upsertData, {upsert: true},(err,data)=>{
    if(err)
    console.log(err);
    res.end(JSON.stringify({status:true}));
    });
})

});


app.listen(port,function() {
    console.log("Server running on port "+port);
})
