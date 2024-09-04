const db = require('../../../models')
const Offers = db.Offers;


module.exports = {
 
  // get handlers
  async showList(req, res) {
    const data = await Offers.findAll();
    console.log("Data : " + data);
    res.render("Offers/list", { data });
  },

  async showAdd(req, res) {
    res.render("Offers/add");
  },

  async add(req, res) {
    const data = {
      offer_name: req.body.offer_name,
      discount_percentage:req.body.discount_percentage,
      valid_from:req.body.valid_from,
      valid_to:req.body.valid_to,
      description:req.body.description,
    };
    console.log("DATA "+data);

    try {
      const record = await Offers.findOne();
      if (!record) {
        const createRecord = await Offers.create(data);
        res.json({
          status: 200,
          message: "Record created successfully",
          redirect: "/offer-and-discount",
        });
      } else {
        const oldRecord = await Offers.findOne({
          where: { offer_name: data.offer_name },
        });
        if (oldRecord) {
          res.json({
            status: 400,
            message: "This record already exists",
            redirect: "/offer-and-discount",
          });
        } else {
          const createNew = await Offers.create(data);
          res.json({
            status: 200,
            message: "Record successfully created",
            redirect: "/offer-and-discount",
          });
        }
      }
    } catch (error) {
      res.json({
        status: 400,
        message: "Some error occured",
        redirect: "/offer-and-discount",
      });
    }
  },

  async delete(req, res) {
    const id = req.body.id;
    let getBanner = await Offers.findOne({ where: { id: id } });
    if (getBanner) {
      const delBan = await Offers.destroy({ where: { id: id } });

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
      let getUserstatus = await Offers.findOne({ where: { id: id } });
      let newStatus, msg;
      if (getUserstatus.status == true) {
        newStatus = false;
        msg = "Inactive Successfully";
      } else {
        newStatus = true;
        msg = "Active Successfully!";
      }
      const updateStatus = await Offers.update(
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
    console.log("ID___",id)
        const data = {
            offer_name: req.body.offer_name,
            discount_percentage:req.body.discount_percentage,
            valid_from:req.body.valid_from,
            valid_to:req.body.valid_to,
            description:req.body.description,
          };
    
    
    let getBanner = await Offers.findOne({ where: { id: id } });
    if (getBanner) {
      const updCat = await Offers.update(
        data,
        { where: { id: id } }
      ).then((data) => {
        console.log("Data Successfully updated");
        res.json({
          status: 200,
          message: "Updated successfully",
          redirect: "/offer-and-discount",
        });
      });
    } else {
      console.log("Cannot update");
      res.json({
        status: 400,
        message: "Cannot Update",
        redirect: "/offer-and-discount",
      });
    }
  },
  async showEdit(req, res) {
    const id = req.params.id;
    console.log("ID---" + id);
    const data = await Offers.findOne({ where: { id: id } });
    res.render("Offers/edit", { data: data });
  },
};