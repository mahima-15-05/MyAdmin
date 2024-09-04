const db = require("../../../models");
const OurTeam = db.OurTeam;
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
      "../../../public/myUploads/OurTeam"
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
  // get handlers
  async showList(req, res) {
    const data = await OurTeam.findAll();
    console.log("Data : " + data);
    res.render("OurTeam/list", { data });
  },

  async showAdd(req, res) {
    res.render("OurTeam/add");
  },

  async add(req, res) {
    const imageFilename =
      (await req.files) &&
      req.files.image &&
      req.files.image[0] &&
      req.files.image[0].filename;
    const data = {
      name: req.body.name,
      designation: req.body.designation,
      image: imageFilename,
    };

    try {
      const record = await OurTeam.findOne();
      
      
      if (!record) {
        console.log("object")
        let createRecord = await OurTeam.create(data);
        console.log("HFI",createRecord)
        res.json({
          status: 200,
          message: "Record created successfully",
          redirect: "/our-team",
        });
      } else {
        const oldRecord = await OurTeam.findOne({
          where: { name: data.name },
        });
        if (oldRecord) {
          res.json({
            status: 400,
            message: "This record already exists",
            redirect: "/our-team",
          });
        } else {
          const createNew = await OurTeam.create(data);
          res.json({
            status: 200,
            message: "Record successfully created",
            redirect: "/our-team",
          });
        }
      }
    } catch (error) {
      res.json({
        status: 400,
        message: "Some error occured"+error,
        redirect: "/our-team",
      });
    }
  },

  async delete(req, res) {
    const id = req.body.id;
    let getBanner = await OurTeam.findOne({ where: { id: id } });
    if (getBanner) {
      const delBan = await OurTeam.destroy({ where: { id: id } });

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
      let getUserstatus = await OurTeam.findOne({ where: { id: id } });
      let newStatus, msg;
      if (getUserstatus.status == true) {
        newStatus = false;
        msg = "Inactive Successfully";
      } else {
        newStatus = true;
        msg = "Active Successfully!";
      }
      const updateStatus = await OurTeam.update(
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
    let getBanner = await OurTeam.findOne({ where: { id: id } });
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
      const updCat = await OurTeam.update(
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
    const data = await OurTeam.findOne({ where: { id: id } });
    res.render("OurTeam/edit", { data: data });
  },
};
