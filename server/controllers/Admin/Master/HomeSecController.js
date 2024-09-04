const db = require("../../../models");
const HomeOtherSections = db.HomeOtherSections;

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
      "../../../public/myUploads/HomeOtherSections"
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

const cpUpload = upload.fields([{ name: "invite_image", maxCount: 1 },{name:"connect_section_banner", maxCount: 1}, {name:"email_sec_banner", maxCount:1}]);

module.exports = {
  cpUpload,
  storage,
  upload,

  async edit(req, res) {
    try{
        
    const invite_image =
    (await req.files) &&
    req.files.invite_image &&
    req.files.invite_image[0] &&
    req.files.invite_image[0].filename;
const connect_section_banner =
    (await req.files) &&
    req.files.connect_section_banner &&
    req.files.connect_section_banner[0] &&
    req.files.connect_section_banner[0].filename;
const email_sec_banner =
    (await req.files) &&
    req.files.email_sec_banner &&
    req.files.email_sec_banner[0] &&
    req.files.email_sec_banner[0].filename;
const data = {
  invite_image: invite_image,
  connect_section_banner: connect_section_banner,
  email_sec_banner: email_sec_banner,
  invite_heading: req.body.invite_heading,
  invite_subheading: req.body.invite_subheading,
  invite_description: req.body.invite_description,
  invite_link: req.body.invite_link,
  connect_sec_heading: req.body.connect_sec_heading,
  connect_sec_description: req.body.connect_sec_description,
  connect_sec_link: req.body.connect_sec_link,
  email_sec_heading: req.body.email_sec_heading,
  email_sec_summary: req.body.email_sec_summary,
  email_sec_subtitle: req.body.email_sec_subtitle,
};
let getData = await HomeOtherSections.findOne();
if (getData) {
  
  const updCat = await HomeOtherSections.update(
   data,
   {where:{id:getData.id}}
  ).then((data) => {
    console.log("Record Successfully updated");
    res.json({
      status: 200,
      message: "Updated successfully",
      redirect: "/home-other-section",
    });
  });
} else {

    let create_data = await HomeOtherSections.create(data);
    res.json({
        status:200,
        message:"Record successfully created",
        redirect:'/home-other-section'
    })
 
}


    }catch(error){
        res.json({
            status:400,
            message:"Some error occured",
            redirect:'/home-other-section'
        })
    }
  },
  async showEdit(req, res) {
   
    const data = await HomeOtherSections.findOne();
    res.render("HomeOtherSections/edit", { data: data });
  },
};
