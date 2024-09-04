const db = require("../../../models");
const User = db.User;
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const MailSender = require('../OtpGenerator');

const storage = multer.diskStorage({
  //destination:'public/myuploads'
  destination: function (req, file, cb) {
    const destinationPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "../../../public/myUploads/User"
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

const cpUpload = upload.fields([{ name: "profile_photo", maxCount: 1 }]);

module.exports = {
  cpUpload,
  storage,
  upload,
  // get handlers
  async showList(req, res) {
    const data = await User.findAll();
    console.log("Data : " + data);
    res.render("User/list", { data });
  },

  async showAdd(req, res) {
    res.render("User/add");
  },

  async add(req, res) {
    const imageFilename =
      (await req.files) &&
      req.files.profile_photo &&
      req.files.profile_photo[0] &&
      req.files.profile_photo[0].filename;
    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      mobile: req.body.mobile,
      email: req.body.email,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      designation: req.body.designation,
      password: "dummy_password",
      profile_photo: imageFilename,
    };

    try {
      const record = await User.findOne();
      
      
      if (!record) {
        console.log("object")
        let createRecord = await User.create(data);
        console.log("HFI",createRecord)
        var text=`Hi ${data.first_name} you are successfully registered with Astrofast. Your Password is ${data.password} `
        MailSender.sendMail(data.email,"mahimatripathi333999@gmail.com",text);
        res.json({
          status: 200,
          message: "Record created successfully",
          redirect: "/user-management",
        });
      } else {
        const oldEmailRecord = await User.findOne({
          where: { email: data.email },
        });
        if (oldEmailRecord) {
          res.json({
            status: 400,
            message: "This record already exists",
            redirect: "/user-management",
          });
        } else {
          const oldMobileRecord = await User.findOne({
            where: { mobile: data.mobile },
          });
          
          const createNew = await User.create(data);
          var text=`Hi ${data.first_name} you are successfully registered with Astrofast. Your Password is ${data.password} `
        MailSender.sendMail(data.email,"mahimatripathi333999@gmail.com",text);
          res.json({
            status: 200,
            message: "Record successfully created",
            redirect: "/user-management",
          });
        }
      }
    } catch (error) {
      res.json({
        status: 400,
        message: "Some error occured"+error,
        redirect: "/user-management",
      });
    }
  },

  async delete(req, res) {
    const id = req.body.id;
    let getBanner = await User.findOne({ where: { id: id } });
    if (getBanner) {
      const delBan = await User.destroy({ where: { id: id } });

      console.log("Banner Successfully deleted");
      res.status(200).send("Status updated successfully");
      // res.json({
      //   status:200,
      //   message:"Deleted Successfully"
      // })
      // res.status(200).send("Status updated successfully");
    } else {
      console.log("Cannot find banner to delete");
      res.json({
        status: 400,
        message: "Cannot Delete",
      });
      // res.status(500).send("Error updating status");
    }
  },
  async updateStatus(req, res) {
    try {
      const id = req.body.id;
      console.log("ID--------->" + id);
      // Assuming you have only one status record
      let getUserstatus = await User.findOne({ where: { id: id } });
      let newStatus, msg;
      if (getUserstatus.status == true) {
        newStatus = false;
        msg = "Inactive Successfully";
      } else {
        newStatus = true;
        msg = "Active Successfully!";
      }
      const updateStatus = await User.update(
        { status: newStatus },
        { where: { id: id } }
      );
      // res.json({
      //   status:200,
      //   message:"Status Updated successfully"
      // })

      res.status(200).send("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).send("Error updating status");
      // res.json({
      //   status:400,
      //   message:"Failed"
      // })
    }
  },
  async edit(req, res) {
    const id = req.body.id;
    let getBanner = await User.findOne({ where: { id: id } });
    // console.log("Banner : " + getBanner);
    console.log("REQ" + req.body.title);
    if (getBanner) {
      const imageFilename =
        (await req.files) &&
        req.files.image &&
        req.files.image[0] &&
        req.files.image[0].filename;
        const data = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          mobile: req.body.mobile,
          email: req.body.email,
          dob: req.body.dob,
          gender: req.body.gender,
          address: req.body.address,
          designation: req.body.designation,
          profile_photo: imageFilename,
        }
      
      const updCat = await User.update(
        data,
        { where: { id: id } }
      ).then((data) => {
        console.log("Data Successfully updated");
        res.json({
          status: 200,
          message: "Updated successfully",
          redirect: "/user-management",
        });
      });
    } else {
      console.log("Cannot update");
      res.json({
        status: 400,
        message: "Cannot Update",
        redirect: "/user-management",
      });
    }
  },
  async showEdit(req, res) {
    const id = req.params.id;
    console.log("ID---" + id);
    const data = await User.findOne({ where: { id: id } });
    res.render("User/edit", { data: data });
  },
};
