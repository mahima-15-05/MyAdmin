const db = require("../../../models");
const Admin = db.Admin;
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  //destination:'public/myuploads'
  destination: function (req, file, cb) {
    const destinationPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "../../../public/myUploads/AdminProfile"
    );

    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath);
    }
    cb(null, destinationPath);
  },

  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
});

const cpUpload = upload.fields([{ name: "image", maxCount: 1 }]);

module.exports = {
  cpUpload,
  storage,
  upload,

  async showList(req, res) {
    const data = await Admin.findOne();
    console.log("Data : " + data);
    res.render("AdminProfile/profilePage", { data:data });
  },

  async add1(req, res) {
    try{
        const imageFilename =
      (await req.files) &&
      req.files.image &&
      req.files.image[0] &&
      req.files.image[0].filename;
        
    const data = {
        name: req.body.name,
        username:req.body.username,
        image:imageFilename,
        mobile:req.body.mobile
    }


    const oldData = await Admin.findOne();
    if(oldData){
      if((data.mobile.length==10 && !isNaN(Number(data.mobile)))){
        const updData = await Admin.update(data,{where:{id:oldData.id}});
        res.json({
            status:200,
            message:"Changes Saved Successfully",
            redirect:'/admin-profile'
        })
      }
      else{
        res.json({
          status:400,
          message:"Invalid Mobile number",
          redirect:'/admin-profile'
      })
      }
        
    }
    else{
        res.json({
            status:400,
            message:"No record Found",
            redirect:'/admin-profile'
        })
    }
        
    
  

    }catch(error){
        res.json({
            status:400,
            message:"Some error occured"+error,
            redirect:'/admin-profile'
        })
    }
  },
  async add2(req, res) {
    try{
       
        
    const data = {
        password: req.body.password,
        newPassword:req.body.newPassword,
        reNewPassword:req.body.reNewPassword
    }
    console.log("dataName : ",data)

    const oldData = await Admin.findOne();
    if(oldData.password===data.password){
        if(oldData && data.newPassword === data.reNewPassword){
        const updData = await Admin.update({password:data.newPassword},{where:{id:oldData.id}});
        res.json({
            status:200,
            message:"Changes Saved Successfully",
            redirect:'/admin-profile'
        })
    }
    else{
        res.json({
            status:400,
            message:"Cannot Change Password",
            redirect:'/admin-profile'
        })
    }
    }
    else{
        res.json({
            status:400,
            message:"Enter Correct Password"
        })
    }
    
        
    
  

    }catch(error){
        res.json({
            status:400,
            message:"Some error occured"+error,
            redirect:'/admin-profile'
        })
    }
  },

  async delete(req, res) {
    const id = req.body.id;
    let getBanner = await Admin.findOne({ where: { id: id } });
    if (getBanner) {
      const delBan = await Admin.destroy({ where: { id: id } });

      console.log("Banner Successfully deleted");
      res.status(200).send("Status updated successfully");
    } else {
      console.log("Cannot find banner to delete");
      res.json({
        status: 400,
        message: "Cannot Delete",
      });
    }
  },

  async updateStatus(req, res) {
    try {
      const id = req.body.id;
      let getUserstatus = await Admin.findOne({ where: { id: id } });
      let newStatus, msg;
      if (getUserstatus.status == true) {
        newStatus = false;
        msg = "Inactive Successfully";
      } else {
        newStatus = true;
        msg = "Active Successfully!";
      }
      const updateStatus = await Admin.update(
        { status: newStatus },
        { where: { id: id } }
      );

      res.status(200).send("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).send("Error updating status");
    }
  },

  async edit(req, res) {
    const id = req.body.id;
    let getBanner = await Admin.findOne({ where: { id: id } });
    // console.log("Banner : " + getBanner);
    console.log("REQ" + req.body.title);
    if (getBanner) {
      const imageFilename =
        (await req.files) &&
        req.files.image &&
        req.files.image[0] &&
        req.files.image[0].filename;
      const name = req.body.name;
      const designation = req.body.designation;
      const image = imageFilename;
      const updCat = await Admin.update(
        {
          name: name,
          designation:designation,
          image: image,
        },
        { where: { id: id } }
      ).then((data) => {
        console.log("Banner Successfully updated");
        res.json({
          status: 200,
          message: "Updated successfully",
          redirect: "/our-team",
        });
      });
    } else {
      console.log("Cannot update");
      res.json({
        status: 400,
        message: "Cannot Update",
        redirect: "/our-team",
      });
    }
  },

  async showEdit(req, res) {
    const id = req.params.id;
    console.log("ID---" + id);
    const data = await Admin.findOne({ where: { id: id } });
    res.render("Admin/edit", { data: data });
  },
};
