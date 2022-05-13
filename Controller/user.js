const User = require('../Models/usermodel')
const CryptoJS = require('crypto-js')

exports.addUser  = async (req,res) =>{
     console.log(req.body.firstname)
   const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.hash_secret
        ).toString()
         
  })
        

   if(!newUser){
        res.send('Cant register')
   }
   else{
        try{
             await newUser.save()
             console.log('Saved')
          }catch(err){
               console.log(err)
          }
     }
}


exports.changepassowrd =  async (req,res ) =>{
     if(req.params.id === req.body.id){
         const user = await User.findByIdAndUpdate(req.body.id, { $set : req.body})
         res.send("user is udpadted")
     }else{
         res.send("you cannot change other passwrd")
     }
 }

exports.deleteaccount = async (req,res) =>{
     if(req.params.id === req.body.id){
          const user = await User.findByIdAndDelete(req.body.id)
          res.send("deleted")
      }else{
          res.send("you cannot delete others account")
      }
}

exports.login = async (req,res) =>{
    
          try{
              const user = await User.findOne({email: req.body.email});
              if(!user){
                  res.statusCode(404).send("Incorrect email")
              }
              
              const hashedPassword = CryptoJS.AES.decrypt(
                 user.password,
                 process.env.hash_secret
             );
               console.log(hashedPassword)
             const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
             console.log(originalPassword)
             
              if(req.body.password === originalPassword){
                  res.send(user)
                  
              }else{
                  res.send('incorrect password')
              }
     
          }catch(err){
              res.send(err)
          }

     }

