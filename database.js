const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/Taskyar")

const userSchema = mongoose.Schema({
    username : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    birthday : {type : String  }
    //projects : {} اینجارو میخوام ازت بپرسم چجوری وصلش کنیم
}
)

const User = mongoose.model("user",userSchema)
const projectSchema = mongoose.Schema({
        name : {type : String, required : true},
        date : {type : Date , required : true},
        expirement : {type : String },// اینجاهم به صورت بالا 
        progress : {type : Number ,required : true},
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        }
})

const Project = mongoose.model("project", projectSchema)
module.exports = { User,Project}
