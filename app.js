const express = require("express")
const app = express()
const User = require("./database")
const bcrypt = require("bcrypt")
const session = require("express-session")
const user = null
app.use(
express.urlencoded({extended:true}))
app.use(session({
    secret: "Pumkingkeyj",// the password is unusable
    resave:false,
    saveUninitialized:false
}))
app.set('view engine','ejs')
app.use(express.static(__dirname+"/public"))
app.get("/",async(req,res)=>{
    username = req.session.username
await res.render("index",{username})
})
app.get("/register",async(req,res)=>{
    await res.render("register")
})
app.get("/login",async(req,res)=>{
    await res.render("login")
})
app.post("/loging",async(req,res)=>{
    const euser =  await User.findOne({
        username: req.body.user
    })
    
    if(!euser){
        return res.send("همچین کاربری در دیتا بیس موجود نیست ")
    }
    const epass = await bcrypt.compare(req.body.pass,euser.password)
    if(!epass){
        return res.send("رمز عبور صحیح نمیباشد")
    }
    req.session.username = req.body.user
    if(euser){
        res.send(`نام شما ${req.body.user}`)
    }
})
app.post("/logout",async(req,res)=>{
     req.session.destroy((err)=>{
        if(err){
            return res.send(err)

        }
        res.redirect("/")
    })  
  
})
app.post("/registering",async(req,res)=>{
  
    if(!req.body.user || !req.body.pass){
        return res.send("تمام بخش ها باید پر شود")
    }
      let user = await User.findOne({username : req.body.user})
      let password = req.body.pass
      let passHashed = await bcrypt.hash(password, 10)
    if(user){
        return res.send("این نام کاربری در حال حاضر وجود دارد")
    }
    await new User({
        username : req.body.user,
        password : passHashed,
        birthday : req.body.birthday
    })
    .save()
    
    req.session.username = req.body.user
    res.redirect("/")
})
app.get("/dashboard",async(req,res)=>{
    await res.render()
})

app.listen("3000",console.log("ready"))


