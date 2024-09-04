const db = require("../../models");
const adminTable = db.Admin;
const OtpGen = require('./OtpGenerator')

const randomNum = Math.random() * 9000
const token = Math.floor(1000 + randomNum)

module.exports = {
   async customDataMiddleware(req, res, next) {
    
      try {
          const data = await adminTable.findOne();
          if (data) {
              res.locals.customData = { data: data };
          }
          next();
      } catch (error) {
          next(error); // Pass error to the next middleware or error handler
      
  }
 

  
  
},
  async viewLogin(req, res) {
    res.render("AdminLogin/login",{req,req});
  },

  async adminLogin(req, res) {
    const admin = await adminTable.findOne({
      where: { username: req.body.username },
    });
    if (admin && admin.status == 1) {
      const password_valid = req.body.password == admin.password;
      if (password_valid) {
        req.session.autherised = true;
        req.session.userId = admin.id;
        req.session.user = admin
      

        res.json({
          status: 200,
          redirect: "/dashboard",
          // data:admin
        });
        // res.redirect('/dashboard');
      } else {
        

        res.json({
          status: 400,
          redirect: "/",
        });
      }
    } else {
      res.json({
        status: 400,
        redirect: "/",
      });

      // res.status(401).redirect('/');
      // res.status(404).json({ error: "User does not exist" });
    }
  },

  async showForgetPassword(req,res){
    res.render('AdminLogin/forgetPassword')
  },
  async getOtp(req,res){
    const email = req.body.email;
    console.log("Email "+email)
    const user = adminTable.findOne({
      where: {
        username: email,
      },
    });
    if(user){
      console.log("email-->"+email)
      adminTable.update({ otp: token }, { where: { username: req.body.email } });
      var text= `Please do not share this OTP ${token}`;
      OtpGen.sendOtp(token,email,"mahimatripathi333999@gmail.com",text);
      res.json({
        status:200,
        redirect:"/enterOtp?email=" + email,
        message:"Otp sent"

      })
      // res.redirect("/enterOtp?email=" + email);
    }
    else{
      res.json({
        status:400,
        redirect:'/forgot-password',
        message:"user not found"
      })
      // res.redirect('/forgot-password');
    }


  },

  async verifyOtp(req,res){
    const user =await  adminTable.findOne({where:{username:req.body.email}});
    // console.log(req.body.email+"Email");
    const email= req.body.email;
    // console.log("USer"+user.username);
    const enteredOtp=req.body.otp;
    // console.log("Otp db"+user.otp)
    // console.log("OTP"+enteredOtp);
    if(user.otp == enteredOtp ){
      console.log("Otp verified");
      res.json({
        status:200,
        redirect:'/enterNewPassword?email='+ email,
        message:"Otp matched"
      })
      // res.redirect('/enterNewPassword?email='+ email);
    }
    else{
      res.json({
        status:400,
        message:"Otp not matched",
        redirect:'/enterOtp'
      })
      // res.redirect('/enterOtp');
    }
  },

  async showEnterNewPass(req,res){
    const email = req.query.email;
    res.render('AdminLogin/newPassword',{email:email})
  },
  async resetPassword(req,res){
    const newPassword = req.body.password;
    const cnfrmPassword = req.body.cnfrmPassword;

    if(newPassword == cnfrmPassword){
      const admin = await adminTable.update({password:newPassword},{where:{username:req.body.email}})
      req.toastr.success('Successfully logged in.', "You're in!");
      res.json({
        status:200,
        redirect:'/',
        message:"Password Changed. Login with new password"
      })
      // res.redirect("/");
    }
    else{
      res.json({
        status:400,
        redirect:'/',
        message:"Cannot change password. Try again later"
      })
      // res.redirect('/enterNewPassword')
    }
  },
  async showEnterOtp(req,res){
    const email=req.query.email;
    res.render('AdminLogin/enterOtp',{ email: email });
  }
};
