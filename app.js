const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const session = require("express-session")
const { User, Project } = require("./database")
const user = null
app.use(
express.urlencoded({extended:true}))
app.use(session({
    secret: "Pumkingkeyj",// the password is unusable
    resave:false,
    saveUninitialized:false
}))
app.set('view engine','ejs')
app.use(express.static("public"))
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
        res.redirect("/dashboard")
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
    res.redirect("/dashboard")
})
app.get("/dashboard",async(req,res)=>{
    if(req.session.username){
           let user = req.session.username
    let userC=  await User.findOne({username : user})
    if(!userC){
        return res.redirect("/login")
    }
    let objectID = userC._id;
    let projects = await Project.find({user : objectID}).limit(2)
    let allProject = await Project.find({user : objectID})
        await res.render("dashboard",{projects: projects , allProject})}
    else{
        return res.redirect("/login")
    }
})

    app.get("/edit/:id", async(req, res) => {
    let project = await Project.findOne({_id : req.params.id})
    res.render("edit",{project})
});

app.post("/edited/:id",async(req,res)=>{
    let user = req.session.username 
    let userFind = await User.findOne({username : user})
    let project = await Project.findOne({_id : req.params.id , user: userFind._id})
    project.name = req.body.name
    project.expirement = req.body.expirment
    await project.save()
    res.redirect("/dashboard")
})
app.post("/delete/:id" , async(req,res)=>{
        let user = req.session.username 
    let userFind = await User.findOne({username : user})
    let project = await Project.findOne({_id : req.params.id , user: userFind._id})
    project.deleteOne()
    res.redirect("/dashboard")
})
app.post("/projectMade",async(req,res,next)=>{
    let user = req.session.username
    let userC=  await User.findOne({username : user})
    if(!userC){
        return res.redirect("/login")
    }
    let objectID = userC._id;
    await new Project({
        name : req.body.name,
        date : req.body.date,
        expirement : req.body.expires,
        progress : 0 ,
        user :  objectID
        
    }).save()
    res.redirect("/dashboard")
})
app.get("/projects",async(req,res)=>{
    
})
app.post("/project",async(req,res)=>{
    
})

app.listen("3000",console.log("ready"))


