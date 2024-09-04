const db = require("../../../models");
const Testimonials = db.Testimonials;
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
      "../../../public/myUploads/Testimonials"
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
    const data = await Testimonials.findAll();
    console.log("Data : " + data);
    res.render("Testimonials/list", { data });
  },

  async showAdd(req, res) {
    res.render("Testimonials/add");
  },

  async add(req, res) {
    const imageFilename =
      (await req.files) &&
      req.files.image &&
      req.files.image[0] &&
      req.files.image[0].filename;
    const data = {
      name: req.body.name,
      profession: req.body.profession,
      review_heading: req.body.review_heading,
      review: req.body.review,
      image: imageFilename,
    };

    try {
      const record = await Testimonials.findOne();
      
      
      if (!record) {
        console.log("object")
        let createRecord = await Testimonials.create(data);
        console.log("HFI",createRecord)
        res.json({
          status: 200,
          message: "Record created successfully",
          redirect: "/testimonials",
        });
      } else {
        const oldRecord = await Testimonials.findOne({
          where: { name: data.name },
        });
        if (oldRecord) {
          res.json({
            status: 400,
            message: "This record already exists",
            redirect: "/testimonials",
          });
        } else {
          const createNew = await Testimonials.create(data);
          res.json({
            status: 200,
            message: "Record successfully created",
            redirect: "/testimonials",
          });
        }
      }
    } catch (error) {
      res.json({
        status: 400,
        message: "Some error occured"+error,
        redirect: "/testimonials",
      });
    }
  },

  async delete(req, res) {
    const id = req.body.id;
    let getBanner = await Testimonials.findOne({ where: { id: id } });
    if (getBanner) {
      const delBan = await Testimonials.destroy({ where: { id: id } });

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
      let getUserstatus = await Testimonials.findOne({ where: { id: id } });
      let newStatus, msg;
      if (getUserstatus.status == true) {
        newStatus = false;
        msg = "Inactive Successfully";
      } else {
        newStatus = true;
        msg = "Active Successfully!";
      }
      const updateStatus = await Testimonials.update(
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
    let getBanner = await Testimonials.findOne({ where: { id: id } });
    // console.log("Banner : " + getBanner);
    console.log("REQ" + req.body.title);
    if (getBanner) {
      const imageFilename =
        (await req.files) &&
        req.files.image &&
        req.files.image[0] &&
        req.files.image[0].filename;
      const name = req.body.name;
      const review = req.body.review;
      const review_heading = req.body.review_heading;
      const profession = req.body.profession;
      const image = imageFilename;
      const updCat = await Testimonials.update(
        {
          name: name,
          profession:profession,
          review_heading:review_heading,
          review: review,
          image: image,
        },
        { where: { id: id } }
      ).then((data) => {
        console.log("Banner Successfully updated");
        res.json({
          status: 200,
          message: "Updated successfully",
          redirect: "/testimonials",
        });
      });
    } else {
      console.log("Cannot update");
      res.json({
        status: 400,
        message: "Cannot Update",
        redirect: "/testimonials",
      });
    }
  },
  async showEdit(req, res) {
    const id = req.params.id;
    console.log("ID---" + id);
    const data = await Testimonials.findOne({ where: { id: id } });
    res.render("Testimonials/edit", { data: data });
  },
};
