const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/Taskyar")

const userSchema = mongoose.Schema({
    username : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    birthday : {type : String  }
}
)

const User = mongoose.model("user",userSchema)

module.exports = User