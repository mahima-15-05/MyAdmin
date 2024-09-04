const db = require('../../models');
const Admin = db.Admin
module.exports={
    async showDashboard(req,res){
        const data = await Admin.findOne()
        res.render('Dashboard/dashboard.ejs',{data:data});
    }
}