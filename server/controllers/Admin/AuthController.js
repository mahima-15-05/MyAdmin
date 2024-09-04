const db = require('../../models')
const Admin = db.Admin;
const authMiddleware = (req, res, next) => {
    // console.log(req.session);
   
     if (req.session.userId) {
       //console.log("ADMIN user id" + req.session.userId);
       next();
     } else {
       res.redirect("/");
     }
   };


   
   module.exports = { authMiddleware };