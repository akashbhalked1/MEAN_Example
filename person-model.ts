const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const PersonSchema = new Schema({
    name: { type: String},
    addr :{type:String}
});

module.exports=mongoose.model('Person',PersonSchema);